import { Component } from 'react';
import { PageTitleProps } from '../../shared/types/props.types';

export default class PageTitle extends Component<PageTitleProps> {
    constructor(props: PageTitleProps) {
        super(props);
    }

    componentDidMount() {
        if (this.props.page && this.props.t) {
            document.title = `BibCNRS - ${this.props.t(`pages.${this.props.page}.title`)}`;
        } else {
            document.title = 'BibCNRS';
        }
    }

    render() {
        return <></>;
    }
}
