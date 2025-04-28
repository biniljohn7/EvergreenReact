import Home from '../components/home/Home'
// import Setting from '../components/settingPage/Setting'
import BenefitCategory from '../components/benefit/BenefitCategory'
import BenefitList from '../components/benefit/Benefit'
import Benefit from '../components/benefit/BenefitDetails'
import SearchBenefit from '../components/benefit/SearchBenefit'
import Career from '../components/career/Career'
import CareerDetail from '../components/career/CareerDetail'
import Referral from '../components/referral/Referral'
import Resource from '../components/resource/Resource'
import Store from '../components/store/Store'
import Event from '../components/eventModule/Event'
import EventDetail from '../components/eventModule/EventDetail'
import Advocacy from '../components/advocacy/Advocacy'
import AdvocacyDetail from '../components/advocacy/AdvocacyDetail'
import Dues from '../components/dues/Dues'
import Membership from '../components/dues/Membership'
import News from '../components/news/News'
import NewsDetails from '../components/news/NewsDetail'
import Inbox from '../components/inbox/Inbox'
import NewPage from '../components/newPage/NewPage'

const protectedRoutes = [
  {
    path: '/home',
    component: NewPage,
  },
  // Do not include it in ProtectedLayout to avoid infinite loop
  // {
  //   path: '/account',
  //   component: Setting,
  // },
  {
    path: '/benefits',
    component: BenefitCategory,
  },
  {
    path: '/benefits/search/list',
    component: SearchBenefit,
  },
  {
    path: '/benefits/:name',
    component: BenefitList,
  },
  {
    path: '/benefits/:name/:categoryId/:benefitId',
    component: Benefit,
  },
  {
    path: '/careers',
    component: Career,
  },
  {
    path: '/careers/:title',
    component: CareerDetail,
  },
  // {
  //   path: '/referrals',
  //   component: Referral,
  // },
  {
    path: '/resources',
    component: Resource,
  },
  {
    path: '/store',
    component: Store,
  },
  {
    path: '/events',
    component: Event,
  },
  {
    path: '/events/:eventId',
    component: EventDetail,
  },
  {
    path: '/events/:name',
    component: EventDetail,
  },
  {
    path: '/advocacy',
    component: Advocacy,
  },
  {
    path: '/advocacy/:advocacyType/:advocacyId',
    component: AdvocacyDetail,
  },
  {
    path: '/dues',
    component: Dues,
  },
  {
    path: '/dues/membership',
    component: Membership,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/news/:newsfeedId',
    component: NewsDetails,
  },
  {
    path: '/inbox',
    component: Inbox,
  },
  {
    path: '/newLanding',
    component: NewPage,
  },
]

export default protectedRoutes
