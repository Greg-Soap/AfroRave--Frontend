export interface IEvents {
  id: number
  thumbnail: string
  image: string
  event_name: string
  event_location: string
  event_date: string
  event_time: { start_time: string; end_time: string }
  rated_18: boolean
  description: string[]
  artist_lineup: string[]
  tickets: { name: string; price: number }[]
  socials: {
    website?: string
    instagram_link?: string
    x_link?: string
    tiktok_link?: string
    youtube_link?: string
  }
}

export const events: IEvents[] = [
  {
    id: 1,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s1.png',
    event_name: 'Punk fest, unleash your inner rebel',
    event_location: 'Live lounge, Victoria island',
    event_date: 'Wed Oct 5th',
    event_time: { start_time: '11am WAT', end_time: '3pm WAT' },
    rated_18: true,
    description: [
      'Step into the vibrant world of ALTÉ — where sound, fashion, and self-expression collide. ALTÉ RENAISSANCE is a night curated for the bold and the free, a sonic exhibition of Nigeria’s new-wave culture.',
      'Expect a genre-bending experience as 10 groundbreaking ALTÉ artists light up the stage with soul, energy, and unapologetic creativity. From dreamy soundscapes to bass-heavy performances, this is where underground meets spotlight.',
      'This isn’t just a concert — it’s a movement.',
    ],
    artist_lineup: ['Yoke Lore', 'Royel Otis', 'Alfie Jukes'],
    tickets: [
      { name: 'Early Bird Access', price: 21000 },
      { name: 'Standard', price: 31350 },
      { name: 'VIP', price: 47000 },
      { name: 'Student', price: 15000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 2,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s2.png',
    event_name: 'Jazz in the Park',
    event_location: 'Freedom Park, Lagos Island',
    event_date: 'Sat Oct 7th',
    event_time: { start_time: '4pm WAT', end_time: '8pm WAT' },
    rated_18: false,
    description: [
      "Experience the smooth sounds of jazz in an open-air setting. Jazz in the Park brings together Nigeria's finest jazz musicians for an evening of soulful melodies and improvisation.",
      'Bring your picnic blankets and enjoy the perfect blend of music and nature.',
      'A family-friendly event that celebrates the rich heritage of jazz music in Nigeria.',
    ],
    artist_lineup: ['Joji', 'Of Monsters and Men', 'M83'],
    tickets: [
      { name: 'General Admission', price: 15000 },
      { name: 'VIP', price: 30000 },
      { name: 'Family Pack (4)', price: 50000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 3,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s3.png',
    event_name: 'Afrobeat Fusion Night',
    event_location: 'Eko Convention Center',
    event_date: 'Fri Oct 13th',
    event_time: { start_time: '7pm WAT', end_time: '11pm WAT' },
    rated_18: true,
    description: [
      "A celebration of Afrobeat's evolution, featuring contemporary artists who are pushing the boundaries of the genre.",
      'Witness the fusion of traditional African rhythms with modern electronic elements.',
      'An unforgettable night of dance and cultural expression.',
    ],
    artist_lineup: ['The Marias', 'Youth Lagoon', 'Ethel Cain', 'Jeff Lamb'],
    tickets: [
      { name: 'Regular', price: 25000 },
      { name: 'Premium', price: 45000 },
      { name: 'VVIP', price: 75000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 4,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s4.png',
    event_name: 'Tech & Music Festival',
    event_location: 'Landmark Event Center',
    event_date: 'Sun Oct 15th',
    event_time: { start_time: '12pm WAT', end_time: '6pm WAT' },
    rated_18: false,
    description: [
      'Where technology meets music in an innovative festival experience.',
      'Featuring live performances, tech demonstrations, and interactive installations.',
      'A unique opportunity to experience the future of entertainment.',
    ],
    artist_lineup: ['Levi Evans', 'The Fray', 'Fireboy DML'],
    tickets: [
      { name: 'Student Pass', price: 10000 },
      { name: 'General Admission', price: 20000 },
      { name: 'Tech VIP', price: 40000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 5,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s5.png',
    event_name: 'Classical Night',
    event_location: 'Muson Center',
    event_date: 'Wed Oct 18th',
    event_time: { start_time: '6pm WAT', end_time: '9pm WAT' },
    rated_18: false,
    description: [
      "An evening of classical music featuring Nigeria's most talented orchestral performers.",
      'Experience the timeless beauty of classical compositions in an elegant setting.',
      'Perfect for music enthusiasts and those seeking a sophisticated cultural experience.',
    ],
    artist_lineup: ['jason Mraz', 'Coldplay', 'The Reality Club'],
    tickets: [
      { name: 'Standard', price: 15000 },
      { name: 'Premium', price: 30000 },
      { name: 'Box Seats', price: 50000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 6,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s6.png',
    event_name: 'Reggae Beach Party',
    event_location: 'Tarkwa Bay Beach',
    event_date: 'Sat Oct 21st',
    event_time: { start_time: '2pm WAT', end_time: '10pm WAT' },
    rated_18: true,
    description: [
      'Feel the rhythm of reggae on the beautiful shores of Tarkwa Bay.',
      'A full day of reggae music, beach activities, and cultural performances.',
      'Join us for a celebration of peace, love, and unity through music.',
    ],
    artist_lineup: ['Paris Paloma', 'Aurora', 'Pheobe Bridgers'],
    tickets: [
      { name: 'Beach Pass', price: 20000 },
      { name: 'VIP Beach Hut', price: 50000 },
      { name: 'Group Package (6)', price: 100000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 7,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s4.png',
    event_name: 'Tech & Music Festival',
    event_location: 'Landmark Event Center',
    event_date: 'Sun Oct 15th',
    event_time: { start_time: '12pm WAT', end_time: '6pm WAT' },
    rated_18: false,
    description: [
      'Where technology meets music in an innovative festival experience.',
      'Featuring live performances, tech demonstrations, and interactive installations.',
      'A unique opportunity to experience the future of entertainment.',
    ],
    artist_lineup: ['Levi Evans', 'The Fray', 'Fireboy DML'],
    tickets: [
      { name: 'Student Pass', price: 10000 },
      { name: 'General Admission', price: 20000 },
      { name: 'Tech VIP', price: 40000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 8,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s5.png',
    event_name: 'Classical Night',
    event_location: 'Muson Center',
    event_date: 'Wed Oct 18th',
    event_time: { start_time: '6pm WAT', end_time: '9pm WAT' },
    rated_18: false,
    description: [
      "An evening of classical music featuring Nigeria's most talented orchestral performers.",
      'Experience the timeless beauty of classical compositions in an elegant setting.',
      'Perfect for music enthusiasts and those seeking a sophisticated cultural experience.',
    ],
    artist_lineup: ['jason Mraz', 'Coldplay', 'The Reality Club'],
    tickets: [
      { name: 'Standard', price: 15000 },
      { name: 'Premium', price: 30000 },
      { name: 'Box Seats', price: 50000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
  {
    id: 9,
    thumbnail: '/assets/event/thumbnail.png',
    image: '/assets/landing-page/s6.png',
    event_name: 'Reggae Beach Party',
    event_location: 'Tarkwa Bay Beach',
    event_date: 'Sat Oct 21st',
    event_time: { start_time: '2pm WAT', end_time: '10pm WAT' },
    rated_18: true,
    description: [
      'Feel the rhythm of reggae on the beautiful shores of Tarkwa Bay.',
      'A full day of reggae music, beach activities, and cultural performances.',
      'Join us for a celebration of peace, love, and unity through music.',
    ],
    artist_lineup: ['Paris Paloma', 'Aurora', 'Pheobe Bridgers'],
    tickets: [
      { name: 'Beach Pass', price: 20000 },
      { name: 'VIP Beach Hut', price: 50000 },
      { name: 'Group Package (6)', price: 100000 },
    ],
    socials: {
      website: 'https://thenativemag.com',
      instagram_link: '/',
      x_link: '/',
    },
  },
]
