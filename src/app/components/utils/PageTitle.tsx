import { Component } from 'react';
import type { PageTitleProps } from '../../shared/types/props.types';

/**
 * Utils component used to update the document title
 */
export default class PageTitle extends Component<PageTitleProps> {
    /**
     * Default constructor
     * @param props Component parameters containing the page id and the update options
     */
    constructor(props: PageTitleProps) {
        super(props);
    }

    /**
     * Update the document title when the component is mounted
     */
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

    /**
     * Render an empty component
     */
    render() {
        return null;
    }
}
