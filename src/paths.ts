export const paths = {
  home() {
    return `/`;
  },
  events() {
    return `/events`;
  },
  features() {
    return `/features`;
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
  settingsPassword() {
    return `/settings/password`;
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
