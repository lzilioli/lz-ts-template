export const SELECTORS: {
	ajaxGetLinkClass: string;
	pageContentDiv: string;
	ellipsisOptOutAttr: string;
	initialState: string;
	valueAttr: string;
} = {
	ajaxGetLinkClass: 'js-ajax-get',
	pageContentDiv: 'js-page-content',
	ellipsisOptOutAttr: 'data-skip-ellipsis',
	initialState: 'js-initial-state',
	valueAttr: 'data-value',
};

export function asSelector(className: string): string {
	return `.${className.split(' ').join('. ')}`;
}