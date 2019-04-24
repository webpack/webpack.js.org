import React from 'react';

export default class VisibilitySensor extends React.Component {
    state = {
        isVisible: false
    };

    constructor(props) {
        super(props);
        this.visibilityTarget = React.createRef();
    }

    componentWillUnmount() {
        this.stopListeningForVisibility();
    }

    componentDidMount () {
        if (this.visibilityTarget.current) {
            this.startListeningForVisibility();
        }
    }

    startListeningForVisibility = () => {
        if (typeof IntersectionObserver !== 'function') {
            // fall back to rendering images
            // browser doesnt support IntersectionObserver;
            return this.setState({ isVisible: true });
        }

        this.observer = new IntersectionObserver(this.visibilityChanged, {
            threshold: 0.05
        });
        this.observer.observe(this.visibilityTarget.current);
    }

    stopListeningForVisibility = () => {
        this.observer && this.observer.unobserve(this.visibilityTarget.current);
        delete this.observer;
    }

    visibilityChanged = (entries) => {
        if (entries[0].isIntersecting) {
            this.setState({ isVisible: true });
            this.stopListeningForVisibility();
        }
    }
}