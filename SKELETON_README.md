# Skeleton Loading Components

This document describes the skeleton loading components created for the Ideator Events website. These components provide smooth loading states that match the website's design system.

## Overview

The skeleton components are designed to:

- Match the website's color scheme (`#0a2449` and `#efede7`)
- Provide smooth animations with `animate-pulse`
- Maintain the same layout structure as the actual content
- Reduce perceived loading time and improve user experience

## Components

### Base Skeleton

```tsx
import { Skeleton } from "@/app/components/Skeleton";

<Skeleton className="h-8 w-32" />;
```

### Hero Section Skeleton

```tsx
import { HeroSkeleton } from "@/app/components/Skeleton";

<HeroSkeleton />;
```

### Portfolio Card Skeleton

```tsx
import { PortfolioCardSkeleton } from "@/app/components/Skeleton";

<PortfolioCardSkeleton />;
```

### Testimonial Card Skeleton

```tsx
import { TestimonialCardSkeleton } from "@/app/components/Skeleton";

<TestimonialCardSkeleton />;
```

### Service Card Skeleton

```tsx
import { ServiceCardSkeleton } from "@/app/components/Skeleton";

<ServiceCardSkeleton />;
```

### About Section Skeleton

```tsx
import { AboutSectionSkeleton } from "@/app/components/Skeleton";

<AboutSectionSkeleton />;
```

### Section Header Skeleton

```tsx
import { SectionHeaderSkeleton } from "@/app/components/Skeleton";

<SectionHeaderSkeleton />;
```

### Grid Skeleton

```tsx
import { GridSkeleton, PortfolioCardSkeleton } from "@/app/components/Skeleton";

// Default portfolio grid
<GridSkeleton columns={3} items={6} />

// Custom card component
<GridSkeleton
  columns={3}
  items={3}
  cardComponent={ServiceCardSkeleton}
/>
```

### Marquee Skeleton

```tsx
import { MarqueeSkeleton } from "@/app/components/Skeleton";

<MarqueeSkeleton items={6} />;
```

### CTA Section Skeleton

```tsx
import { CTASectionSkeleton } from "@/app/components/Skeleton";

<CTASectionSkeleton />;
```

### Full Page Skeleton

```tsx
import { FullPageSkeleton } from "@/app/components/Skeleton";

<FullPageSkeleton />;
```

## Usage Examples

### 1. Section Loading State

```tsx
import { useState, useEffect } from "react";
import { GridSkeleton, PortfolioCardSkeleton } from "@/app/components/Skeleton";

export default function PortfolioSection() {
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    // Fetch data
    fetchPortfolioData().then((data) => {
      setPortfolioItems(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#efede7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeaderSkeleton />
          <GridSkeleton columns={3} items={3} />
        </div>
      </section>
    );
  }

  return (
    // Your actual portfolio content
  );
}
```

### 2. Individual Card Loading

```tsx
import { PortfolioCardSkeleton } from "@/app/components/Skeleton";

export default function PortfolioCard({ item, loading }) {
  if (loading) {
    return <PortfolioCardSkeleton />;
  }

  return (
    // Your actual portfolio card content
  );
}
```

### 3. Full Page Loading

```tsx
import { FullPageSkeleton } from "@/app/components/Skeleton";

export default function HomePage() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Wait for all resources to load
    Promise.all([
      // Your loading promises
    ]).then(() => {
      setPageLoading(false);
    });
  }, []);

  if (pageLoading) {
    return <FullPageSkeleton />;
  }

  return (
    // Your actual page content
  );
}
```

## Demo Page

Visit `/skeleton-demo` to see all skeleton components in action. The demo page includes:

- Interactive buttons to switch between different skeleton types
- 3-second loading simulation
- Reset functionality to replay the loading states

## Customization

### Colors

The skeleton components use the website's color scheme:

- Primary: `#0a2449` (dark blue)
- Background: `#efede7` (light beige)
- Skeleton color: `bg-[#0a2449]/10` (10% opacity of primary)

### Animation

All skeleton elements use Tailwind's `animate-pulse` class for smooth loading animation.

### Responsive Design

All skeleton components are responsive and match the actual content's responsive behavior.

## Integration with Existing Code

The skeleton components are designed to work seamlessly with your existing codebase:

1. **Import the components** where needed
2. **Replace loading states** with appropriate skeleton components
3. **Maintain the same layout structure** as your actual content
4. **Use conditional rendering** to show skeleton during loading

## Best Practices

1. **Show skeleton immediately** when data is loading
2. **Match the actual content structure** as closely as possible
3. **Use appropriate skeleton types** for different content (cards, text, images)
4. **Keep skeleton animations smooth** and not distracting
5. **Test on different screen sizes** to ensure responsive behavior

## Performance Considerations

- Skeleton components are lightweight and don't impact performance
- Use `Suspense` boundaries for code-splitting with skeleton fallbacks
- Consider lazy loading for skeleton components in large applications

## Troubleshooting

### Common Issues

1. **Skeleton not showing**: Ensure the loading state is properly set
2. **Layout mismatch**: Check that skeleton structure matches actual content
3. **Animation not working**: Verify Tailwind CSS is properly configured

### Debug Tips

- Use browser dev tools to inspect skeleton elements
- Compare skeleton layout with actual content layout
- Test on different devices and screen sizes
