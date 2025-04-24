/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

import { dictionary } from "../resources/multiLanguages";

const languageReducer = "de";

const routes = [
  {
    path: "/app/user_dashboard",
    icon: "HomeIcon",
    name: dictionary["sidebar"][languageReducer]["dashboard"],
  },
  {
    path: "/app/create_ads",
    icon: "PlusIcon",
    name: dictionary["sidebar"][languageReducer]["createAds"],
  },
  {
    path: "/app/userLists",
    icon: "OutlineCogIcon",
    name: dictionary["sidebar"][languageReducer]["myProperties"],
  },
  {
    path: "/app/profile",
    icon: "OutlinePersonIcon",
    name: dictionary["sidebar"][languageReducer]["profile"],
  },
  {
    path: "/app/faq",
    icon: "QuestionMark",
    name: dictionary["sidebar"][languageReducer]["help"],
  },
];

export default routes;
