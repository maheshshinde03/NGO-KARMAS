export interface mutualFriends {
    id: number;
    img: string;
    name: string;
    email: string;
    status: string;
}
export interface activityFeed {
    img: string;
    name: string;
    time: string;
}

export interface comment {
    id: number;
    replyMessage: string;
    profile: string;
    name: string;
    time: string;
    message: string;
}

export interface followers {
    id: number;
    profile: string;
    name: string;
}

export interface Photos {
    image: string;
}

export interface addFriends {
    id: number;
    profile: string;
    name: string;
}

export interface hobbiesEduction {
    heading: string;
    data: hobbiesData[]
}

export interface hobbiesData {
    id: number;
    title: string;
    year?: string;
    desc: string;
}

export interface activityLog {
    title: string;
    data: activityLogData[]
}

export interface activityLogData {
    icon: string;
    data: string;
}

export interface photos {
    srcUrl: string;
    previewUrl: string
}

export const mutualFriendsData: mutualFriends[] = [
    {
        id: 1,
        img: 'assets/images/avatar/8.jpg',
        name: 'Bucky Barnes',
        email: 'winter@gmail.com',
        status: 'online'
    },
    {
        id: 2,
        img: 'assets/images/avatar/9.jpg',
        name: 'Sarah Loren',
        email: 'barnes@gmail.com',
        status: 'busy'
    },
    {
        id: 3,
        img: 'assets/images/avatar/1.jpg',
        name: 'Jason Borne',
        email: 'jasonb@gmail.com',
        status: 'offline'
    },
    {
        id: 4,
        img: 'assets/images/avatar/2.jpg',
        name: 'Comeren Diaz',
        email: 'comere@gmail.com',
        status: 'offline'
    },
    {
        id: 5,
        img: 'assets/images/avatar/3.jpg',
        name: 'Andew Jon',
        email: 'andrewj@gmail.com',
        status: 'online'
    },
    {
        id: 6,
        img: 'assets/images/avatar/4.jpg',
        name: 'Johny Waston',
        email: '@gmail.comjohny',
        status: 'busy'
    },
    {
        id: 7,
        img: 'assets/images/avatar/5.jpg',
        name: 'Johny William',
        email: 'johnyw@gmail.com',
        status: 'offline'
    },
    {
        id: 8,
        img: 'assets/images/avatar/7.jpg',
        name: 'Bucky Barnes',
        email: 'winter@gmail.com',
        status: 'online'
    },
    {
        id: 9,
        img: 'assets/images/avatar/1.jpg',
        name: 'Sarah Loren',
        email: 'barnes@gmail.com',
        status: 'busy'
    },
    {
        id: 10,
        img: 'assets/images/avatar/2.jpg',
        name: 'Jason Borne',
        email: 'jasonb@gmail.com',
        status: 'offline'
    },
    {
        id: 11,
        img: 'assets/images/avatar/3.jpg',
        name: 'Comeren Diaz',
        email: 'comere@gmail.com',
        status: 'offline'
    },
    {
        id: 12,
        img: 'assets/images/avatar/4.jpg',
        name: 'Andew Jon',
        email: 'andrewj@gmail.com',
        status: 'online'
    },
    {
        id: 13,
        img: 'assets/images/avatar/5.jpg',
        name: 'Johny Waston',
        email: 'johny@gmail.com',
        status: 'busy'
    },
    {
        id: 14,
        img: 'assets/images/avatar/6.jpg',
        name: 'Johny William',
        email: 'johnyw@gmail.com',
        status: 'offline'
    },
]

export const activityFeedData: activityFeed[] = [
    {
        img: 'assets/images/avatar/7.jpg',
        name: 'Andew Jon',
        time: '20 min Ago'
    },
    {
        img: 'assets/images/avatar/8.jpg',
        name: 'Johny Waston',
        time: '1 hour Ago'
    },
    {
        img: 'assets/images/avatar/9.jpg',
        name: 'Comeren Diaz',
        time: '1 days Ago'
    },
    {
        img: 'assets/images/avatar/1.jpg',
        name: 'Sarah Loren',
        time: '2 days Ago'
    },
    {
        img: 'assets/images/avatar/2.jpg',
        name: 'Johny Waston',
        time: '5 days Ago'
    },
    {
        img: 'assets/images/avatar/3.jpg',
        name: 'Comeren Diaz',
        time: '6 days Ago'
    },
]

export const commentOneData: comment[] = [
    {
        id: 1,
        replyMessage: 'me',
        profile:'assets/images/user/1.jpg',
        name: 'Jason Borne',
        time: '1 Year Ago',
        message: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
    },
    {
        id: 2,
        replyMessage: 'reply',
        profile:'assets/images/user/2.png',
        name: 'Alexendra Dhadio',
        time: '1 Month Ago',
        message: 'yes, really very awesome car i see the features of this car in the official website of #Mercedes-Benz and really impressed :-)',
    },
    {
        id: 3,
        replyMessage: 'reply',
        profile:'assets/images/user/3.png',
        name: 'Olivia Jon',
        time: '15 Days Ago',
        message: 'i like lexus cars, lexus cars are most beautiful with the awesome features, but this car is really outstanding than lexus',
    },
    {
        id: 4,
        replyMessage: 'me',
        profile:'assets/images/user/1.jpg',
        name: 'Issa Bell',
        time: '1 Year Ago',
        message: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
    },
]

export const commentTwoData: comment[] = [
    {
        id: 1,
        replyMessage: 'me',
        profile:'assets/images/user/1.jpg',
        name: 'Jason Borne',
        time: '1 Year Ago',
        message: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
    },
    {
        id: 2,
        replyMessage: 'me',
        profile:'assets/images/user/1.jpg',
        name: 'Issa Bell',
        time: '1 Year Ago',
        message: 'we are working for the dance and sing songs. this car is very awesome for the youngster. please vote this car and like our post',
    }
]

export const Followers: followers[] = [
    {
        id: 1,
        profile:'assets/images/avatar/4.jpg',
        name: 'Bucky Barnes',
    },
    {
        id: 2,
        profile:'assets/images/avatar/5.jpg',
        name: 'Sarah Loren',
    },
    {
        id: 3,
        profile:'assets/images/avatar/6.jpg',
        name: 'Jason Borne',
    },
    {
        id: 4,
        profile:'assets/images/avatar/7.jpg',
        name: 'Comeren Diaz',
    },
    {
        id: 5,
        profile:'assets/images/avatar/8.jpg',
        name: 'Andew Jon',
    },
]

export const Following: followers[] = [
    {
        id: 1,
        profile:'assets/images/avatar/9.jpg',
        name: 'Sarah Loren',
    },
    {
        id: 2,
        profile:'assets/images/avatar/1.jpg',
        name: 'Bucky Barnes',
    },
    {
        id: 3,
        profile:'assets/images/avatar/2.jpg',
        name: 'Comeren Diaz',
    },
    {
        id: 4,
        profile:'assets/images/avatar/3.jpg',
        name: 'Jason Borne',
    },
    {
        id: 5,
        profile:'assets/images/avatar/4.jpg',
        name: 'Andew Jon',
    },
]

export const latestPhotos: Photos[] = [
    { image: 'assets/images/social-app/post-1.png' },
    { image: 'assets/images/social-app/post-2.png' },
    { image: 'assets/images/social-app/post-3.png' },
    { image: 'assets/images/social-app/post-4.png' },
    { image: 'assets/images/social-app/post-5.png' },
    { image: 'assets/images/social-app/post-6.png' },
    { image: 'assets/images/social-app/post-7.png' },
    { image: 'assets/images/social-app/post-8.png' },
]

export const Friends: Photos[] = [
    { image: 'assets/images/avatar/3.jpg' },
    { image: 'assets/images/avatar/5.jpg' },
    { image: 'assets/images/avatar/1.jpg' },
    { image: 'assets/images/avatar/2.jpg' },
    { image: 'assets/images/avatar/3.jpg' },
    { image: 'assets/images/avatar/6.jpg' },
    { image: 'assets/images/avatar/1.jpg' },
    { image: 'assets/images/avatar/10.jpg' },
    { image: 'assets/images/avatar/1.jpg' },
    { image: 'assets/images/avatar/4.jpg' },
    { image: 'assets/images/avatar/11.jpg' },
    { image: 'assets/images/avatar/8.jpg' },
]

export const peopleKnowYouData: addFriends[] = [
    {
        id: 1,
        profile:'assets/images/avatar/7.jpg',
        name: 'Jason Borne',
    },
    {
        id: 2,
        profile:'assets/images/avatar/8.jpg',
        name: 'Anna Mull',
    },
    {
        id: 3,
        profile:'assets/images/avatar/9.jpg',
        name: 'Dion Cast',
    },
    {
        id: 4,
        profile:'assets/images/avatar/1.jpg',
        name: 'Karlene Lex',
    },
    {
        id: 5,
        profile:'assets/images/avatar/2.jpg',
        name: 'Vella Chism',
    },
    {
        id: 6,
        profile:'assets/images/avatar/3.jpg',
        name: 'Wai Schalk',
    },
    {
        id: 7,
        profile:'assets/images/avatar/4.jpg',
        name: 'Karlene Lex',
    },
]

export const hobbiedAndInterestData: hobbiesEduction[] = [
    {
        heading: "Hobbies And Interests",
        data: [
            {
                id: 1,
                title: 'Hobbies:',
                desc: 'I like to ride the bike to work, swimming, and working out. I also like reading design magazines, go to museums, and binge watching a good tv show while it’s raining outside.',


            },
            {
                id: 2,
                title: 'Favourite Music Bands / Artists:',
                desc: 'Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.',
            },
            {
                id: 3,
                title: 'Favourite TV Shows:',
                desc: 'Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.',

            },
            {
                id: 4,
                title: 'Favourite Books:',
                desc: 'The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water.',
            },
            {
                id: 5,
                title: 'Favourite Movies:',
                desc: 'Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad Ferrum Man.',

            },
            {
                id: 6,
                title: 'Favourite Writers:',
                desc: 'Martin T. Georgeston, Jhonathan R. Token, Ivana Rowle, Alexandr Platt, Marcus Roth.',
            },
            {
                id: 7,
                title: 'Favourite Games:',
                desc: 'The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch Auto.',

            },
            {
                id: 8,
                title: 'Other Interests:',
                desc: 'Swimming, Surfing, Scuba Diving, Anime, Photography, Tattoos, Street Art.',
            },
        ]
    }
]

export const eductionData: hobbiesEduction[] = [
    {
        heading: 'Education And Employement',
        data: [
            {
                id: 1,
                title: 'The New College of Design',
                year: '2001 - 2006',
                desc: 'Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.'
            },
            {
                id: 2,
                title: 'Digital Design Intern',
                year: '2006-2008',
                desc: 'Digital Design Intern for the “Multimedz” agency. Was in charge of the communication with the clients.'
            },
            {
                id: 3,
                title: 'Rembrandt Institute',
                year: '2008',
                desc: 'Five months Digital Illustration course. Professor: Leonardo Stagg.'
            },
            {
                id: 4,
                title: 'UI/UX Designer',
                year: '2001 - 2006',
                desc: 'Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.'
            },
            {
                id: 5,
                title: 'The Digital College',
                year: '2010',
                desc: '6 months intensive Motion Graphics course. After Effects and Premire. Professor: Donatello Urtle'
            },
            {
                id: 6,
                title: 'The New College of Design',
                year: '2008 - 2013',
                desc: 'UI/UX Designer for the “Daydreams” agency.'
            },
        ]
    }
]

export const activityLog: activityLog[] = [
    {
        title: 'Today',
        data: [
            {
                icon: 'thumbs-up',
                data: 'Comeren Diaz likes your photos.',
            },
            {
                icon: 'user-plus',
                data: 'Karlene Lex and Comeren Diaz now friends.',
            },
            {
                icon: 'message-square',
                data: 'Sarah Loren wrote on your timeline',
            },
            {
                icon: 'thumbs-up',
                data: 'Johny Waston likes your post`s.',
            },
            {
                icon: 'user-plus',
                data: 'Andew Jon became friends with Comeren Diaz.',
            },
            {
                icon: 'user-plus',
                data: 'Johny Waston became friends with Bucky Barnes.',
            },
        ]
    },
    {
        title: '25 December',
        data: [
            {
                icon: 'thumbs-up',
                data: 'Comeren Diaz likes your photos.',
            },
            {
                icon: 'thumbs-up',
                data: 'Johny Waston likes your post`s.',
            },
            {
                icon: 'user-plus',
                data: 'Karlene Lex and Comeren Diaz now friends.',
            },
            {
                icon: 'user-plus',
                data: 'Johny Waston became friends with Bucky Barnes.',
            },
            {
                icon: 'message-square',
                data: 'Sarah Loren wrote on your timeline',
            },
            {
                icon: 'message-square',
                data: 'Comeren Diaz wrote on your timeline',
            },
        ]
    },
    {
        title: '8 september',
        data: [
            {
                icon: 'thumbs-up',
                data: 'Comeren Diaz likes your photos.',
            },
            {
                icon: 'thumbs-up',
                data: 'Johny Waston likes your post`s.',
            },
            {
                icon: 'user-plus',
                data: 'Karlene Lex and Comeren Diaz now friends.',
            },
            {
                icon: 'user-plus',
                data: 'Johny Waston became friends with Bucky Barnes.',
            },
            {
                icon: 'message-square',
                data: 'Sarah Loren wrote on your timeline',
            },
            {
                icon: 'user-plus',
                data: 'Andew Jon became friends with Comeren Diaz.',
            },
        ]
    },
    {
        title: '6 June',
        data: [
            {
                icon: 'thumbs-up',
                data: 'Comeren Diaz likes your photos.',
            },
            {
                icon: 'user-plus',
                data: 'Karlene Lex and Comeren Diaz now friends.',
            },
            {
                icon: 'message-square',
                data: 'Sarah Loren wrote on your timeline',
            },
            {
                icon: 'thumbs-up',
                data: 'Johny Waston likes your post`s.',
            },
            {
                icon: 'user-plus',
                data: 'Andew Jon became friends with Comeren Diaz.',
            },
            {
                icon: 'user-plus',
                data: 'Johny Waston became friends with Bucky Barnes.',
            },
        ]
    }
]

export const photosData: photos[] = [
    {
        srcUrl: 'assets/images/big-lightgallery/1.jpg',
        previewUrl: 'assets/images/lightgallery/1.jpg',
       
    },
    {
        srcUrl: 'assets/images/big-lightgallery/2.jpg',
        previewUrl: 'assets/images/lightgallery/2.jpg',
       
    },
    {
        srcUrl: 'assets/images/big-lightgallery/3.jpg',
        previewUrl: 'assets/images/lightgallery/3.jpg',
      
    },
    {
        srcUrl: 'assets/images/big-lightgallery/4.jpg',
        previewUrl: 'assets/images/lightgallry/4.jpg',
   
    },
    {
        srcUrl: 'assets/images/big-lightgallery/5.jpg',
        previewUrl: 'assets/images/lightgallery/5.jpg',
      
    },
    {
        srcUrl: 'assets/images/big-lightgallery/6.jpg',
        previewUrl: 'assets/images/lightgallery/6.jpg',
      
    },
    {
        srcUrl: 'assets/images/big-lightgallery/7.jpg',
        previewUrl: 'assets/images/lightgallery/7.jpg',
     
    },
    {
        srcUrl: 'assets/images/big-lightgallery/8.jpg',
        previewUrl: 'assets/images/lightgallery/8.jpg',
      
    },
]
