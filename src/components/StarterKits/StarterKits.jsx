import React from 'react';
import Container from '../Container/Container';
import Link from '../Link/Link';
import Kits from './starter-kits-data.json';
import './StarterKits.scss';

// NOTE: The table classes used in this component correspond to
// those used in the markdown utility. Ideally we will soon create
// a table component that both the markdown utility and this page
// can use. This component could even use something like griddle
// to allow sorting and such.

const StarterKits = props => (
  <Container className="starter-kits page__content">
    <h1>起步配套工具</h1>

    <p>
      下面表格包含一个起步配套工具的辅助列表，
      可以作为基于 webpack 的项目的起点。
      要向列表添加新的配套工具请访问
      <Link to="https://github.com/ahfarmer/tool-list">仓库</Link>
      以及提交一个 PR 来修改这个文件
      <code>generator/starterProjectUrls.js</code>.
    </p>

    <blockquote className="warning">
      <div className="tip-content">
        模板应该是用于<b>验证概念</b>，
        以帮助你学习各种框架的 webpack 不同技术。
        确保你了解他们在做什么，并避免复制和粘贴制造重复代码。
        另外还请注意，这些都不是由 webpack 官方支持的。
        如果遇到问题，请向仓库的维护人员报告。
      </div>
    </blockquote>

    <div className="table">
      <div className="table-wrap">
        <div className="table-header">
          <div className="table-tr">
            <div className="table-th">项目名称</div>
            <div className="table-th">维护人员</div>
            <div className="table-th">标签</div>
          </div>
        </div>
        <div className="table-body">
          { Kits.map((kit, i) => (
            <div className="table-tr" key={ i }>
              <div className="table-td">
                <div className="table-td-title">Project Name</div>
                <div className="table-td-content">
                  <Link to={ kit.githubUrl }>{ kit.githubRepoName }</Link>
                </div>
              </div>
              <div className="table-td">
                <div className="table-td-title">Maintainer</div>
                <div className="table-td-content">{ kit.githubUserName }</div>
              </div>
              <div className="table-td">
                <div className="table-td-title">Tags</div>
                <div className="table-td-content">
                  { kit.tags.map((tag, i) => (
                    <span key={ i } className="starter-kits__tag">{ tag }</span>
                  )) }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Container>
);

StarterKits.title = 'Starter Kits';

export default StarterKits;
