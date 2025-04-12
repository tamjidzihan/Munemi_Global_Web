import { BlogData } from '../../../types/blog';


// Import local images
import visaSingapore from '../assets/images/visa-singapore.jpg';
import visaAustralia from '../assets/images/visa-australia.jpg';

export const blogData: BlogData = {
    categories: ['Immigration Visa', 'PR Visa', 'Working Visa'],
    tags: [
        'Consultations',
        'Education',
        'Embassy',
        'Immigration',
        'Tourism',
        'Timeline',
        'Travel Tips',
        'Visa',
    ],
    countries: [
        {
            name: 'Canada',
            image: '../assets/images/canada.jpg',
        },
        {
            name: 'United Kingdom',
            image: '../assets /images/uk.jpg',
        },
        {
            name: 'Australia',
            image: '../assets/images/australia.jpg',
        },
    ],


    blogPosts: [
        {
            category: 'Immigration Visa',
            slug: 'what-visa-do-you-need-to-work-legally-in-singapore',
            readTime: '2 min read',
            title: 'What visa do you need to work legally in Singapore?',
            excerpt:
                'Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien. Quaerat neque purus ipsum neque dolor primis',
            image: visaSingapore,
            author: 'Jhon doe',
            date: 'February 26, 2020',
            content: `
        <p>Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna nihil impedit ligula risus. Mauris donec ociis et magnis sapien etiam sapien sem sagittis congue tempor gravida donec enim ipsum porta justo integer at odio velna.</p>
        <p>Sagittis congue augue egestas volutpat egestas magna suscipit egestas magna ipsum vitae purus efficitur ipsum primis in cubilia laoreet augue egestas luctus donec diam.</p>
        <h2>Semper lacus cursus porta, feugiat primis</h2>
        <p>Curabitur ac dapibus libero. Quisque eu tristique neque. Phasellus blandit tristique justo ut aliquam. Aliquam vitae molestie nunc. Quisque sapien justo, aliquet non molestie sed, venenatis nec purus. Aliquam eget lacinia elit. Vestibulum tincidunt tincidunt massa, et porttitor justo.</p>
        <ul>
          <li>Tempor magna ipsum vitae purus primis pretium</li>
          <li>An magnis nulla dolor sapien augue erat iaculis</li>
          <li>Pretium ligula rutrum luctus blandit porta justo</li>
          <li>Feugiat a primis ultrice ligula risus auctor rhoncus purus ipsum primis</li>
          <li>Sapien undo pretium purus ligula tempus ipsum</li>
          <li>Quaerat sodales sapien undo euismod purus and blandit (Luctus Blandit Porta)</li>
        </ul>
      `
        },
        {
            category: 'Working Visa',
            slug: 'top-reasons-for-australian-working-visa-rejection',
            readTime: '2 min read',
            title: 'Top reasons for Australian working visa rejection',
            excerpt:
                'Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien libero tempus impedit tempor blandit sapien gravida',
            image: visaAustralia,
            author: 'Jhon doe',
            date: 'February 26, 2020',
            content: `
        <p>Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien libero tempus impedit tempor blandit sapien gravida.</p>
        <h2>Understanding the Australian Visa Process</h2>
        <p>Curabitur ac dapibus libero. Quisque eu tristique neque. Phasellus blandit tristique justo ut aliquam.</p>
      `
        }
    ],

};