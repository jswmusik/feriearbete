import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Don't redirect to the default locale (sv)
  // This means /about will serve Swedish content
  // while /en/about will serve English content
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /static (static files)
  // - .*\\..*  (files with extensions like .jpg, .css, etc.)
  matcher: ['/((?!api|_next|static|.*\\..*).*)']
};

