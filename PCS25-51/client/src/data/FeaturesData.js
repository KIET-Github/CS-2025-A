import React from 'react';

import { BsBarChartLine, BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import {GiMonkey} from 'react-icons/gi'
const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

export const featuresData = [
	{
		name: 'Security',
		description: 'The platform is fully secure and votes are stored through smartcontracts.',
		icon: iconStyle(BsFillShieldLockFill),
		imgClass: 'one',
	},
	{
		name: 'Transparency',
		description: 'All the transactions are transparent and visible to everyone.',
		icon: iconStyle(AiOutlineFileSearch),
		imgClass: 'two',
	},
	{
		name: 'Immutable',
		description: 'The votes once casted cannot be changed.',
		icon: iconStyle(RiSecurePaymentLine),
		imgClass: 'three',
	},
	{
		name: 'NFT',
		description: 'NFT is provided as a token of verification for those who cast vote.',
		icon: iconStyle(GiMonkey),
		imgClass: 'four',
	},
	{
		name: 'Ethereum',
		description: 'We use Ethereum Blockchain to decentralize the voting system.',
		icon: iconStyle(FaEthereum),
		imgClass: 'five',
	},
	{
		name: 'Polls',
		description:
			'Create and Deploy fair polls for your organisation.',
		icon: iconStyle(BsBarChartLine),
		imgClass: 'six',
	},
];
