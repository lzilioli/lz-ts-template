import assert from 'assert';
import * as util from '@server/util';

export async function test(): Promise<void> {
	describe( 'getHostWithPort', () => {
        it('works with normal settings', () => {
            assert.equal(
				util.getHostWithPort({
					host: 'example.com',
					port: 1000,
					excludePortFromURLs: false
				}),
				'example.com:1000'
			);
		});
        it('honors the excludePortFromURLs flag', () => {
            assert.equal(
				util.getHostWithPort({
					host: 'example.com',
					port: 1000,
					excludePortFromURLs: true
				}),
				'example.com'
			);
		});
        it('ignores port if it is 8080, regardless of excludePortFromURLs flag', () => {
            assert.equal(
				util.getHostWithPort({
					host: 'example.com',
					port: 8080,
					excludePortFromURLs: true
				}),
				'example.com'
			);
            assert.equal(
				util.getHostWithPort({
					host: 'example.com',
					port: 8080,
					excludePortFromURLs: false
				}),
				'example.com'
			);
		});
	});
}
