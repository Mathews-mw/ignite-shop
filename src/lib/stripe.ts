import Stripe from 'stripe';

export const stripe = new Stripe('sk_test_51Lyc4zLBGMtrgoEehNe2T9DOjYAHBwvsT4wCBiTavOliOjwwPJ1Z5A9AAAyHW2QsbpGuDhtMDkE5LJ4C8f8rTLQb00ZmQLB3AS', {
	apiVersion: '2022-08-01',
	appInfo: {
		name: 'Ignite Shop',
	},
});
