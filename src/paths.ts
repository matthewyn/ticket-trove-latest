export const paths = {
  home() {
    return `/`;
  },
  events() {
    return `/events`;
  },
  login() {
    return `/login`;
  },
  signup() {
    return `/signup`;
  },
  settings() {
    return `/settings`;
  },
  bookings() {
    return `/bookings`;
  },
  bookingDetails(id: string) {
    return `/bookings/${id}`;
  },
  profile() {
    return `/settings/profile`;
  },
  movieDetails(slug: string) {
    return `/movies/${slug}`;
  },
  movieScreenings(slug: string) {
    return `/movies/${slug}/screenings`;
  },
  movieSeats(slug: string, screening: string) {
    return `/movies/${slug}/screenings/${screening}`;
  },
};
