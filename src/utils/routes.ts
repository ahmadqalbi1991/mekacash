import { IconCode, IconCodeAsterisk, IconCurrencyDollar, IconDashboard, IconQuestionMark, IconShoppingCart } from "@tabler/icons-react"

export const ROUTES = [
    {
        label: 'Home',
        url: '/home'
    },
    {
        label: 'About Us',
        url: '/about-us'
    },
    {
        label: 'Blogs',
        url: '/blogs'
    },
    {
        label: 'FAQs',
        url: '/faqs'
    },
    {
        label: 'Contact Us',
        url: '/contact-us'
    },
]

export const MERCHANT_ROUTES = [
    {
        label: 'Dashboard',
        url: '/merchant/dashboard',
        icon: IconDashboard
    },
    {
        label: 'Get Embed Code',
        url: '/merchant/embed-code',
        icon: IconCode
    },
    {
        label: 'API Keys',
        url: '/merchant/api-keys',
        icon: IconCodeAsterisk
    },
    {
        label: 'Payment Link',
        url: '/merchant/payment-link',
        icon: IconCurrencyDollar
    },
    {
        label: 'Money In',
        url: '/merchant/money-in',
        icon: IconCurrencyDollar
    },
    {
        label: 'Money Out',
        url: '/merchant/money-out',
        icon: IconCurrencyDollar
    },
    {
        label: 'Money Transfer',
        url: '/merchant/money-transfer',
        icon: IconDashboard
    },
    {
        label: 'Money Received',
        url: '/merchant/money-received',
        icon: IconDashboard
    },
    {
        label: 'Payment Logs',
        url: '/merchant/payment-logs',
        icon: IconDashboard
    },
    {
        label: 'Trade Coin',
        url: '/merchant/trade-coins',
        icon: IconDashboard
    },
    {
        label: 'Create Invoice',
        url: '/merchant/invoices',
        icon: IconDashboard
    },
    {
        label: 'Settlements',
        url: '/merchant/settlements',
        icon: IconDashboard
    },
    {
        label: 'Shop',
        url: '/merchant/shop',
        icon: IconShoppingCart
    },
    {
        label: 'Support Tickets',
        url: '/merchant/support',
        icon: IconQuestionMark
    },
]