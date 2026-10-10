export interface button {
    mainTitle: string,
    title: string,
    item: items[];
}

export interface items {
    class: string,
    text?: string,
    icon?: string
    icon_enble: boolean
}


export const buttons: button[] =
    [
        {
            mainTitle: 'Badges Contextual Variation',
            title: ' <span>Use the</span><code>.badge</code><span>utility class to make more badges.</span>',
            item: [
                {
                    class: 'badge-primary',
                    text: 'Primary',
                    icon_enble: false
                },
                {
                    class: 'badge-secondary',
                    text: 'Secondary',
                    icon_enble: false
                },
                {
                    class: 'badge-tertiary',
                    text: 'Tertiary',
                    icon_enble: false
                },
                {
                    class: 'badge-success',
                    text: 'Success',
                    icon_enble: false
                },
                {
                    class: 'badge-info',
                    text: 'Info',
                    icon_enble: false
                },
                {
                    class: 'badge-warning',
                    text: 'Warning',
                    icon_enble: false
                },
                {
                    class: 'badge-danger',
                    text: 'Danger',
                    icon_enble: false
                },
                {
                    class: 'badge-light text-dark',
                    text: 'Light',
                    icon_enble: false
                },
                {
                    class: 'badge badge-dark tag-pills-sm-mb',
                    text: 'Dark',
                    icon_enble: false
                },

            ]
        },
    ]

export const pills: button[] = [
    {
        mainTitle: 'Pills Contextual Variations',
        title: ' <span>Use the</span><code>.rounded-pill</code><span> utility class to make badges more rounded.</span> ',
        item: [
            {
                class: 'badge rounded-pill badge-primary',
                text: 'Primary',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-secondary',
                text: 'Secondary',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-tertiary',
                text: 'Tertiary',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-success',
                text: 'Success',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-info',
                text: 'Info',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-warning',
                text: 'Warning',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-danger',
                text: 'Danger',
                icon_enble: false
            },
            {
                class: 'rounded-pill badge-light text-dark',
                text: 'Light',
                icon_enble: false
            },
            {
                class: 'badge rounded-pill badge-dark tag-pills-sm-mb',
                text: 'Dark',
                icon_enble: false
            },
        ]
    },
]

export const NumberBadge: button[] = [
    {
        mainTitle: 'Number of Badge',
        title: '   <span>Use the</span><code>.badge</code><span> utility class to make badges more rounded with a larger border-radius.</span>',
        item: [
            {
                class: 'badge badge-primary',
                text: '1',
                icon_enble: false
            },
            {
                class: 'badge badge-secondary',
                text: '2',
                icon_enble: false
            },
            {
                class: 'badge badge-tertiary',
                text: '3',
                icon_enble: false
            },
            {
                class: 'badge badge-success',
                text: '4',
                icon_enble: false
            },
            {
                class: 'badge badge-info',
                text: '5',
                icon_enble: false
            },
            {
                class: 'badge badge-warning',
                text: '6',
                icon_enble: false
            },
            {
                class: 'badge badge-danger',
                text: '7',
                icon_enble: false
            },
            {
                class: ' badge badge-light text-dark',
                text: '8',
                icon_enble: false
            },
            {
                class: 'badge badge-dark',
                text: '9',
                icon_enble: false
            },
        ]
    },


]
export const NumberPillstag: button[] = [
    {
        mainTitle: 'Number of Pills Tags',
        title: '<span>Use the</span> <code>.rounded-pill</code> <span> utility class to make badges more rounded with a larger border-radius.</span>',
        item: [
            {
                class: 'badge rounded-circle badge-p-space badge-primary',
                text: '1',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-secondary',
                text: '2',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-tertiary',
                text: '3',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-success',
                text: '4',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-info',
                text: '5',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-warning',
                text: '6',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-danger',
                text: '7',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge badge-light text-dark',
                text: '8',
                icon_enble: false
            },
            {
                class: 'badge rounded-circle badge-p-space badge-dark',
                text: '9',
                icon_enble: false
            },
        ]
    },
];
export const iconbadge: button[] = [
    {
        mainTitle: 'Badge Tags With Icons',
        title: '<span>Use the</span> <code>.badge</code> <span> utility class to make moreicons.</span>',
        item: [
            {
                class: 'badge b-ln-height badge-primary p-2',
                icon: 'activity',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-secondary p-2',
                icon: 'headphones',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-tertiary p-2',
                icon: 'link',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-success p-2',
                icon: 'github',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-info p-2',
                icon: 'award',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-warning p-2',
                icon: 'dollar-sign',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-danger p-2',
                icon: 'heart',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-light text-dark p-2',
                icon: 'mail',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-dark p-2',
                icon: 'airplay',
                icon_enble: true
            }
        ]
    },
]

export const iconpills: button[] = [
    {
        mainTitle: 'Rounded Pills With Icons',
        title: '<span>Use the</span><code>.badge</code><span> utility class to make more icons.</span>',
        item: [
            {
                class: 'badge b-ln-height badge-secondary rounded-pill p-2',
                icon: 'activity',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-secondary rounded-pill p-2',
                icon: 'headphones',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-tertiary rounded-pill p-2',
                icon: 'link',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-success rounded-pill p-2',
                icon: 'github',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-info rounded-pill p-2',
                icon: 'award',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-warning rounded-pill p-2',
                icon: 'dollar-sign',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-danger rounded-pill p-2',
                icon: 'heart',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-light rounded-pill text-dark p-2',
                icon: 'mail',
                icon_enble: true
            },
            {
                class: 'badge b-ln-height badge-dark rounded-pill p-2',
                icon: 'airplay',
                icon_enble: true
            }
        ]
    },
]
export const BadgePartButtons = [
    {
        color: 'primary',
        text: 'Messages',
        icon: 'mail',
    },
    {
        color: 'secondary',
        text: 'notifications',
        icon: 'bell',
    },
    {
        color: 'tertiary',
        text: 'Update available',
        icon: 'settings',
    },
    {
        color: 'success',
        text: 'Playing Now',
        icon: 'music',
    },
    {
        color: 'info',
        text: '1.2 GB Use',
        icon: 'alert-triangle',
    }
]

