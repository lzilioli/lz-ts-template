import assert from 'assert';
import * as util from '@server/util';

export async function test(): Promise<void> {
	describe( 'getHostWithPort', () => {
        it('works with normal settings', () => {
            assert.equal(
				util.getHostWithPort({
					protocol: 'https',
					hostname: 'example.com',
					port: 1000,
				}),
				'https://example.com:1000'
			);
		});
        it('ignores port if it is 80, or 8080, regardless of excludePortFromURLs flag', () => {
            assert.equal(
				util.getHostWithPort({
					protocol: 'https',
					hostname: 'example.com',
					port: 80,
				}),
				'https://example.com'
			);
            assert.equal(
				util.getHostWithPort({
					protocol: 'https',
					hostname: 'example.com',
					port: 8080,
				}),
				'https://example.com'
			);
		});
	});
}
