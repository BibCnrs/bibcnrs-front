import { PageTitleProps } from '../../shared/types/props.types';
import { Component } from 'react';

export default class PageTitle extends Component<PageTitleProps> {
    constructor(props: PageTitleProps) {
        super(props);
    }

    componentDidMount() {
        if (this.props.customTitle && this.props.page) {
            document.title = `BibCNRS - ${this.props.page}`;
            return;
        }
        if (this.props.page && this.props.t) {
            document.title = `BibCNRS - ${this.props.t(`pages.${this.props.page}.title`)}`;
            return;
        }
        document.title = 'BibCNRS';
    }

    render() {
        return <></>;
    }
}
