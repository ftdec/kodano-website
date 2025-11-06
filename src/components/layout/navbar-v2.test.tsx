import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NavbarV2 } from './navbar-v2';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
  useScroll: () => ({ scrollY: { get: () => 0, getPrevious: () => 0 } }),
  useMotionValueEvent: vi.fn(),
}));

describe('NavbarV2 Component', () => {
  it('renders logo and brand name', () => {
    render(<NavbarV2 />);
    expect(screen.getByText('Kodano')).toBeInTheDocument();
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<NavbarV2 />);
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Soluções')).toBeInTheDocument();
    expect(screen.getByText('Desenvolvedores')).toBeInTheDocument();
    expect(screen.getByText('Preços')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<NavbarV2 />);
    const ctaButtons = screen.getAllByText('Falar com vendas');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('toggles mobile menu', async () => {
    render(<NavbarV2 />);

    // Find and click mobile menu button
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    // Menu should open
    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    // Find and click close button
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
  });

  it('applies glassmorphism classes', () => {
    const { container } = render(<NavbarV2 />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('backdrop-blur');
  });

  it('has accessible navigation structure', () => {
    const { container } = render(<NavbarV2 />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('prevents body scroll when mobile menu is open', () => {
    render(<NavbarV2 />);

    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    // Check if body overflow is hidden
    expect(document.body.style.overflow).toBe('hidden');

    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);

    // Body overflow should be restored
    expect(document.body.style.overflow).toBe('');
  });
});