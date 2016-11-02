import React from 'react';
import SidebarItem from '../sidebar-item/sidebar-item';
import * as api from "./api";
import './app-style';

function updateByProperty(array, property, propertyValue, update) {
  return array.map(item => {
    if(item[property] === propertyValue) {
      return update(item);
    } else {
      return item;
    }
  });
}

export default class VoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selfInfo: undefined,
      listInfo: undefined,
      isFetchingSelf: false,
      isVoting: 0
    };
  }

  isBrowserSupported() {
    return typeof localStorage === 'object' && typeof fetch === 'function';
  }

  componentDidMount() {
    if(!this.isBrowserSupported())
      return;

    let { selfInfo, listInfo } = this.state;

    if(api.isLoginActive()) {
      this.setState({
        isLoginActive: true
      });
      api.continueLogin().then(token => {
        window.localStorage.voteAppToken = token;
      });
    } else {
      if(!selfInfo) {
        this.updateSelf();
      }
      if(!listInfo) {
        this.updateList();
      }
    }
  }

  updateSelf() {
    let { voteAppToken } = localStorage;
    if(voteAppToken) {
      this.setState({
        isFetchingSelf: true
      });
      api.getSelf(voteAppToken).then(result => {
        this.setState({
          selfInfo: result,
          isFetchingSelf: false
        });
      }).catch(e => {
        this.setState({
          selfInfo: null,
          isFetchingSelf: false
        });
      });
    }
  }

  updateList() {
    let { name } = this.props;
    let { voteAppToken } = localStorage;
    this.setState({
      isFetchingList: true
    });
    api.getList(voteAppToken, name).then(result => {
      this.setState({
        listInfo: result,
        isFetchingList: false
      });
    }).catch(e => {
      this.setState({
        listInfo: null,
        isFetchingList: false
      });
    });
  }

  vote(itemId, voteName, value, currencyName, score) {
    let { selfInfo, listInfo } = this.state;
    let { voteAppToken } = localStorage;
    this.setState({
      isVoting: this.state.isVoting + 1,
      listInfo: listInfo && {
        ...listInfo,
        items: updateByProperty(listInfo.items, "id", itemId, item => ({
          ...item,
          votes: updateByProperty(item.votes, "name", voteName, vote => ({
            ...vote,
            votes: vote.votes + value
          })),
          userVotes: updateByProperty(item.userVotes, "name", voteName, vote => ({
            ...vote,
            votes: vote.votes + value
          })),
          score: item.score + score
        }))
      },
      selfInfo: selfInfo && {
        ...selfInfo,
        currencies: updateByProperty(selfInfo.currencies, "name", currencyName, currency => ({
          ...currency,
          used: currency.used + value,
          remaining: currency.remaining - value
        }))
      }
    });
    api.vote(voteAppToken, itemId, voteName, value).then(() => {
      this.setState({
        isVoting: this.state.isVoting - 1
      });
    });
  }

  render() {
    let { name } = this.props;

    if(!this.isBrowserSupported())
      return <div>Your browser is not supported.</div>;

    let { selfInfo, listInfo, isVoting, isFetchingList, isFetchingSelf, isCreating, isLoginActive } = this.state;

    let { voteAppToken } = localStorage;

    if(isLoginActive) {
      return <div>Logging in...</div>;
    }

    const inProgress = isFetchingList || isFetchingSelf || isCreating || isVoting;

    return (
      <div className="vote-app">
        {this.renderSelf()}
        { listInfo && <div>
          <button className="vote-app__update-button" disabled={inProgress} onClick={() => {
            this.updateSelf();
            this.updateList();
          }}>Update</button>
          <h1>{listInfo.displayName}</h1>
          <div>{listInfo.description}</div>
          <ul className="vote-app__items-list">
            { listInfo.items.map(item => <li>
              <span className="vote-app__item-title">{item.title}</span>
              <span>{item.description}</span><br />
              <ul className="vote-app__vote-list">
                {listInfo.possibleVotes.map((voteSettings, idx) => {
                  let vote = item.votes[idx];
                  let userVote = item.userVotes && item.userVotes[idx];
                  let currencyInfo = selfInfo && voteSettings.currency && this.findByName(selfInfo.currencies, voteSettings.currency);
                  let maximum = voteSettings.maximum || Infinity;
                  let minimum = voteSettings.minimum || 0;
                  let maxVote = userVote && maximum - userVote.votes;
                  let minVote = userVote && minimum - userVote.votes;
                  if(currencyInfo && currencyInfo.remaining < maxVote) maxVote = currencyInfo.remaining;
                  let renderVoteButton = (v) => {
                    return <button disabled={inProgress} onClick={() => {
                      this.vote(item.id, voteSettings.name, v, voteSettings.currency, voteSettings.score * v);
                    }}>{ v > 0 ? "+" + v : v }</button>;
                  };
                  return <li className={"vote-app__vote-" + voteSettings.name} key={voteSettings.name} title={userVote ? "You voted " + userVote.votes + "." : "Login to see your votes."}>
                    <div className="vote-app__vote-value">
                      {vote.votes > 0 && voteSettings.minimum < 0 ? "+" + vote.votes : vote.votes}
                      {userVote && userVote.votes ? " (You: " + (userVote.votes > 0 && voteSettings.minimum < 0 ? "+" + userVote.votes : userVote.votes) + ")" : ""}
                    </div>
                    { selfInfo && <div className="vote-app__vote-buttons">
                      <div className="vote-app__vote-negative">{this.getNiceVoteValues(Math.min(100, -minVote)).map(v => renderVoteButton(-v))}</div>
                      <div className="vote-app__vote-positive">{this.getNiceVoteValues(Math.min(100, maxVote)).map(v => renderVoteButton(v))}</div>
                    </div> }
                  </li>;
                })}
                <li className="vote-app__vote-score" key="score">
                  Score {item.score}
                </li>
              </ul>
            </li>)}
            { listInfo.isAdmin && <li className="vote-app__admin">
              <div><input type="text" value={this.state.newTitle} disabled={inProgress} onChange={e => this.setState({newTitle: e.target.value})} /></div>
              <div><textarea rows="4" value={this.state.newDescription} disabled={inProgress} onChange={e => this.setState({newDescription: e.target.value})} /></div>
              <div><button onClick={() => {
                const { newTitle, newDescription } = this.state;
                if(newTitle && newDescription) {
                  this.setState({
                    isCreating: true
                  });
                  api.createItem(voteAppToken, name, newTitle, newDescription).then(item => {
                    this.setState({
                      newTitle: "",
                      newDescription: "",
                      isCreating: false,
                      listInfo: listInfo && {
                        ...listInfo,
                        items: [
                          ...listInfo.items,
                          item
                        ]
                      }
                    });
                  });
                }
              }}>Create Item</button></div>
            </li> }
          </ul>
        </div> }
      </div>
    );
  }

  renderSelf() {
    let { selfInfo, isFetchingSelf } = this.state;
    if(!selfInfo) {
      if(isFetchingSelf) {
        return <div className="vote-app__self-info">Loading user info...</div>;
      }
      return <div className="vote-app__self-info">You are not logged in. <button onClick={() => {
        api.startLogin(window.location + "");   
      }}>Login with Github</button></div>;
    } else {
      return <div className="vote-app__self-info">
        You are logged in as {selfInfo.login}. <button onClick={() => {
          delete window.localStorage.voteAppToken;
          window.location.reload();
        }}>Log out</button>
        <ul className="vote-app__currency-list">
          { selfInfo.currencies.map(currency => <li className={"vote-app__currency-" + currency.name} title={`${currency.description}\nYou used ${currency.used} of a total of ${currency.value} ${currency.displayName}.`}>
            {currency.remaining} {currency.displayName}
          </li>) }
        </ul>
      </div>;
    }
  }

  findByName(array, name) {
    for(var i = 0; i < array.length; i++)
      if(array[i].name === name)
        return array[i];
    return null;
  }

  getNiceVoteValues(maximum) {
    var arr = [];
    var b = true;
    for(var x = 1; x < maximum; x *= b ? 5 : 2, b = !b) {
      arr.push(x);
    }
    if(maximum)
      arr.push(maximum);
    return arr;
  }
}
