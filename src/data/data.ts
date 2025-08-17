interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendeeCount: number;
  price: string;
  speakers: { name: string; role: string }[];
  hasInPerson: boolean;
  hasOnline: boolean;
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Some awesome topic, that has some unnecessarily long title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tincidunt urna, eget malesuada dolor. Mauris tincidunt leo',
    date: '20 Sept 2025',
    location: 'BBD Rosebank, Johannesburg, ZA',
    attendeeCount: 20,
    price: 'free',
    speakers: [
      { name: 'Thabiso Magwaza', role: 'Speaker' },
      { name: 'Nathi Ngwenya', role: 'Speaker' },
    ],
    hasInPerson: true,
    hasOnline: true,
  },
  {
    id: '2',
    title: 'Some awesome topic, that has some unnecessarily long title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tincidunt urna, eget malesuada dolor. Mauris tincidunt leo',
    date: '20 Sept 2025',
    location: 'Johannesburg, ZA',
    attendeeCount: 20,
    price: 'from R5',
    speakers: [],
    hasInPerson: true,
    hasOnline: true,
  },
  {
    id: '3',
    title: 'Some awesome topic, that has some unnecessarily long title',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut tincidunt urna, eget malesuada dolor. Mauris tincidunt leo',
    date: '20 Sept 2025',
    location: 'Johannesburg, ZA',
    attendeeCount: 20,
    price: 'from R30',
    speakers: [],
    hasInPerson: true,
    hasOnline: true,
  },
];
