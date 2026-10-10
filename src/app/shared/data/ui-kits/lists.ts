
export interface commonlist{
    title:string,
    des:string,
    class?:string,
    item:items[]
}
export interface items{
    text:string,
    class:string,
    class2?:string
}

export const DefaultLists = [
    {
        list: 'Logo Design'
    },
    {
        list: 'Web Design & Development'
    },
    {
        list: 'E-Commerce'
    },
    {
        list: 'SEO'
    },
];

export const activeLists = [
    {
        list: 'UI Kits',
        class: 'active bg-warning-light'
    },
    {
        list: 'Wow Animations'
    },
    {
        list: 'Apex Charts'
    },
    {
        list: 'Starter Kits'
    },
];

export const FlushLists = [
    {
        list: 'PRODUCT'
    },
    {
        list: 'PRODUCT DETAILS'
    },
    {
        list: 'CART'
    },
    {
        list: 'CHECKOUT'
    }
];

export const topcommonlists :commonlist[] = [
    {
        title:'Default lists',
        des:' Use the <code>.list-group </code>define the list of items. and used <code>.list-group-item </code>to indicate the current content.',
        item:[
            {
                text:'Logo Design',
                class:'list-group-item',
                class2:'light',
            },
            {
                text:'Web Design & Development',
                class:'list-group-item',
                class2:'light',
                
            },
            {
                text:'E-Commerce',
                class:'list-group-item',
                class2:'light',
            },
            {
                text:'SEO',
                class:'list-group-item',
                class2:'light',
            },
        ]
    },
    {
        title:'Active lists',
        des:' Use<code>.active </code>to a<code>.list-group-item</code> to indicate the current active.',
        item:[
            {
                text:'UI Kits',
                class:'list-group-item active bg-warning-light',
                class2:'white',
            },
            {
                text:'Wow Animations',
                class:'list-group-item',
                class2:'light'
            },
            {
                text:'Apex Charts',
                class:'list-group-item',
                class2:'light'

            },
            {
                text:'Starter Kits',
                class:'list-group-item',
                class2:'light'

            },
        ]
    },
    {
        title:'Flush lists',
        des:' Use <code> .list-group-flush</code> to remove some borders and rounded corners to render list group items.',
        class:'list-group-flush',
        item:[
            {
                text:'PRODUCT',
                class:'list-group-item',
                class2:'light'

            },
            {
                text:'PRODUCT DETAILS ',
                class:'list-group-item',
                class2:'light'

            },
            {
                text:'CART',
                class:'list-group-item',
                class2:'light'

            },
            {
                text:'CHECKOUT',
                class:'list-group-item',
                class2:'light'

            },
        ]
    },
];

export const ContextualClasses = [
    {
        class: 'list-group-item-primary',
        list: 'This is Primary bg you can use <em class="txt-primary fw-bold">.list-group-item-primary</em>  class.'
    },
    {
        class: 'list-group-item-secondary',
        list: 'This is secondary bg you can use <em class="txt-secondary fw-bold">.list-group-item-secondary</em>  class.'
    },
    {
        class: 'list-group-item-success',
        list: 'This is Success bg you can use <em class="txt-success fw-bold">.list-group-item-success</em>  class.'
    },

    {
        class: 'list-group-item-danger',
        list: 'This is Danger bg you can use<em class="txt-danger fw-bold">.list-group-item-danger</em> class.'
    },
    {
        class: 'list-group-item-warning',
        list: 'This is warning bg you can use<em class="txt-warning fw-bold">.list-group-item-warning</em> class.'
    },
    {
        class: 'list-group-item-info',
        list: 'This is Info bg you can use<em class="txt-info fw-bold">.list-group-item-info</em> class.'
    },
    {
        class: 'list-group-item-white',
        list: 'This is White bg you can use<em class="txt-dark fw-bold">.list-group-item-white</em> class.'
    },
    {
        class: 'list-group-item-dark',
        list: 'This is Dark bg you can use<em class="txt-dark fw-bold">.list-group-item-dark</em> class.'
    },
]

export const HorizontalLists = [
    {
        bordercolor: 'primary',
        data: [

            {
                list: 'Product',
                border: true
            },
            {
                list: 'Product details',
                border: false
            },
            {
                list: 'Pricing',
                border: false
            },
            {
                list: 'Payment details',
                border: false
            },
            {
                list: 'Checkout',
                border: false
            },
            {
                list: 'Mega option',
                border: false
            },
        ]
    },
    {
        bordercolor: 'secondary',
        data: [
            {
                list: 'Basic table',
                border: true
            },
            {
                list: 'Sizing table',
                border: false
            },
            {
                list: 'Border table',
                border: false
            },
            {
                list: 'Basic input',
                border: false
            },
            {
                list: 'Form va,lidations',
                border: false
            },
        ]
    },
    {
        bordercolor: 'warning',
        data:
            [
                {
                    list: 'Flat style',
                    border: true
                },
                {
                    list: 'Edge styls',
                    border: false
                },
                {
                    list: 'Button group',
                    border: false
                },
                {
                    list: 'Rating',
                    border: false
                },
                {
                    list: 'Crypto',
                    border: false
                },
            ]
    },
    {
        bordercolor: 'success',
        data: [

            {
                list: 'Blog',
                border: true
            },
            {
                list: 'Blog details',
                border: false
            },
            {
                list: 'Blog single',
                border: false
            },
            {
                list: 'Order history',
                border: false
            },

        ]
    },
    {
        bordercolor: 'info',
        data: [
            {
                list: 'Gallery grid',
                border: true

            },
            {
                list: 'Gallery desc',
                border: false
            },
            {
                list: 'Masonry Desc',
                border: false
            },

        ]
    },
]
export const CustomContentLists = [

    {
        class: 'active bg-primary',
        img: 'assets/images/avatar/1.jpg',
        name: 'Molly Boake',
        email: 'MollyBoake@rhyta.com',
        time: '5 days ago',
        contant: 'Next step is to choose a tone of voice for your content type. From casual tconvincing, pick one from 20+ tones in the dropdown.Why did we say “snag eyeballs” instead of“get attention ?” Why do we say “brick - and - mortar words” instead of “concrete words ?” Because, i your email subject lines, it’s better to use words that people can picture.',
        follwer: '820K Followers' 
    },
    {
        class: 'list-hover-primary',
        img: 'assets/images/avatar/2.jpg',
        text:'text-light',
        name: 'Gabrielle Fahey',
        email: 'GabrielleFahey@dayrep.com', 
        time: '10 days ago',
        contant: 'Your aim with this blog is to advertise yourself and your services in blog design, That means it s vital to create content about just that: blog design. Anything else on your page may act as a distraction to your potential customers, and you dont want that!',
        follwer: '1.6M Followers'
    },
    {
        class: 'list-hover-primary',
        img: 'assets/images/avatar/3.jpg',
        text:'text-light',
        name: 'Lucinda Moseley',
        email: 'LucindaMoseley@teleworm.us',
        time: '3 days ago',
        contant: 'People who are looking to hire a web designer may not know what to look out for.This will give you a chance to prove your trustworthiness by providing potential customers withadvice and will let you sell your services by highlighting their best qualities.',
        follwer: '2.4M Followers'
    },
];
export const Listcheckbox = [
    {
        class: 'primary',
        list: ' Auto Start',
    },
    {
        class: 'secondary',
        list: ' Auto Update'
    },
    {
        class: 'success',
        list: ' Don t check auth key'
    },
    {
        class: 'warning',
        list: ' Success all'
    },
];

export const Listradios = [
    {
        for:'firstRadio1',
        class: 'primary',
        list: ' Meditations',
        value:true
        
    },
    {
        for:'firstRadio2',
        class: 'secondary',
        list: ' Read a book',
        value:false
    },
    {
        for:'firstRadio3',
        class: 'success',
        list: ' Learn to code',
        value:false
    },
    {
        for:'firstRadio4',
        class: 'info',
        list: ' Drink more water',
        value:false
    },
]


export const NumberedBadgeLists = [
    {
        list: 'Stella Nowland',
        text: 'Freelance',
        class: 'bg-warning'
    },
    {
        list: 'Lola Stanford',
        text: 'Issue',
        class: ' bg-danger text-white'
    },
    {
        list: 'Caitlin Coungeau',
        text: 'Social',
        class: 'bg-primary text-white'
    },
    {
        list: 'Setting',
        text: 'issue',
        class: ' bg-danger text-white'
    },
];
export const DisabledLists = [
    {
        class: 'list-hover-primary active',
        img: 'assets/images/user/1.jpg',
        name: 'Teresa J. Mosteller'
    },
    {
        class: 'list-hover-primary',
        img: 'assets/images/user/3.jpg',
        name: 'Gloria D. Acheson'
    },
    {
        class: 'disabled',
        img: 'assets/images/user/2.jpg',
        name: 'Sharon C. Obrien'
    },
    {
        class: 'disabled',
        img: 'assets/images/user/5.jpg',
        name: 'Bryan A. Owens'
    },
]

export const ScrollableLists = [
    {
        class: 'active',
        img: 'assets/images/avatar/9.jpg',
        name: 'Molly Boake',
        email: 'MollyBoake@rhyta.com',
        time: '5 days ago'
    },
    {
        img: 'assets/images/avatar/8.jpg',
        name: 'Gabrielle Fahey',
        email: 'GabrielleFahey@dayrep.com',
        time: '10 days ago',
    },
    {
        img: 'assets/images/avatar/7.jpg',
        name: 'Lucinda Moseley',
        email: 'LucindaMoseley@teleworm.us',
        time: '3 days ago',
    },
    {
        img: 'assets/images/avatar/6.jpg',
        name: 'Francis K. Henriques',
        email: 'FrancisKHenriques@teleworm.us',
        time: '2 days ago',
    },
    {
        img: 'assets/images/avatar/5.jpg',
        name: 'Jose A. Seay',
        email: 'JoseASeay@rhyta.com',
        time: '15 days ago',
    },
    {
        img: 'assets/images/avatar/4.jpg',
        name: 'Phil F. Cunningham',
        email: 'PhilFCunningham@dayrep.com',
        time: '6 days ago',
    },
    {
        img: 'assets/images/avatar/3.jpg',
        name: 'Richard E. Johnson',
        email: 'RichardEJohnson@teleworm.us',
        time: '20 days ago',
    },
    {
        img: 'assets/images/avatar/2.jpg',
        name: 'RLawrence L. Nash',
        email: 'LawrenceLNash@jourrapide.com',
        time: '8 days ago',
    },
];


