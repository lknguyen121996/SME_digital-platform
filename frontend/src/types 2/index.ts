/**
 * Product types
 */
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

/**
 * Event types
 */
export interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
  price: string;
  location: string;
  image: string;
  imageMask: string;
}

/**
 * Blog post types
 */
export interface BlogPost {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}
