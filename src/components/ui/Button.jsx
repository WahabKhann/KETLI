import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// Primary (solid) and secondary (outline) buttons, in a version for black
// bands and one for gold bands. Styles live in index.css (.btn-*): solid
// buttons have a gradient face, inner highlight and a glow on hover; outline
// buttons get a glass fill on hover; every button presses down on click.
const variants = {
  primary: 'btn-primary', // solid gold — on black
  secondary: 'btn-secondary', // gold outline — on black
  dark: 'btn-dark', // solid black — on gold
  ghost: 'btn-ghost', // black outline — on gold
};

const sizes = {
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

/**
 * Shared button/link component. Renders a router <Link> for internal paths,
 * an <a> for external/tel/mailto links, otherwise a <button>.
 */
const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', href, className = '', ...props },
  ref,
) {
  const classes = `btn ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('tel:') || href.startsWith('mailto:');

    if (!isExternal) {
      return (
        <Link ref={ref} to={href} className={classes} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a ref={ref} href={href} className={classes} target='_blank' rel='noopener noreferrer' {...props}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  );
});

export default Button;
