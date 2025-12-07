# Chef Card Implementation Documentation

## Overview
This implementation provides a complete solution for displaying chef information with two views:
1. **Chef Cards** - Summary view showing all chefs in a grid
2. **Chef Detail** - Detailed view for individual chefs

## File Structure

```
src/
├── lib/
│   └── api.ts                          # API functions and TypeScript interfaces
├── app/
    ├── chefs/
    │   ├── page.tsx                    # Chef list page
    │   ├── loading.tsx                 # Loading state for list
    │   ├── error.tsx                   # Error state for list
    │   └── [id]/
    │       ├── page.tsx                # Chef detail page (dynamic route)
    │       ├── loading.tsx             # Loading state for detail
    │       └── error.tsx               # Error state for detail
    └── components/
        ├── ChefCard.tsx                # Chef card component
        └── ChefDetail.tsx              # Chef detail component
```

## Data Structures

### ChefSummary
Used for displaying chef cards in the list view:
```typescript
interface ChefSummary {
  id: number;
  name: string;
  profilePicture: string;
  experience: number;
  foodOrigin: string;
  expertise: string;
  basePrice: number;
}
```

### ChefDetail
Used for displaying detailed chef information:
```typescript
interface ChefDetail {
  id: number;
  name: string;
  profilePicture: string;
  experience: number;
  foodOrigin: string;
  expertise: string;
  basePrice: number;
  about: string;
  specialties: string[];
  setMenus: string[];
  dishGallery: string[];
  extraInformation: string;
}
```

## API Integration

### Endpoints
- `GET /api/chefs` - Returns array of ChefSummary objects
- `GET /api/chefs/{id}` - Returns single ChefDetail object

### API Functions
```typescript
// Fetch all chefs (summary data)
getChefs(): Promise<ChefSummary[]>

// Fetch single chef (detailed data)
getChefById(id: number): Promise<ChefDetail>
```

## Components

### ChefCard
- Displays chef summary information
- Clickable card that navigates to detail page
- Shows: profile picture, name, origin, experience, expertise, base price
- Responsive design with hover states

### ChefDetail
- Displays complete chef information
- Sections include:
  - Header with profile picture and key info
  - About section
  - Specialties list (if available)
  - Set menus (if available)
  - Dish gallery images (if available)
  - Extra information (if available)
- Gracefully handles empty arrays

## Routing

### List View
- URL: `/chefs`
- Fetches chef summaries from API
- Displays grid of ChefCard components

### Detail View
- URL: `/chefs/[id]`
- Dynamic route using Next.js App Router
- Fetches full chef details by ID
- Includes back button to return to list

## Features

### Data Optimization
- List page only fetches summary data (lighter payload)
- Detail page fetches full data only when needed
- No-store cache policy for fresh data

### Loading States
- Custom loading skeletons for both list and detail views
- Smooth user experience during data fetching

### Error Handling
- Custom error pages for both views
- User-friendly error messages
- Retry functionality on detail page
- Navigation options when errors occur

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly click targets

### Image Handling
- Next.js Image component for optimization
- Fallback placeholder images
- Responsive image sizing
- Lazy loading for gallery images

## Environment Configuration

Set your API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Default: `http://localhost:8080`

## Usage Example

### Displaying Chef Cards
The `/chefs` page automatically fetches and displays all chefs:
```tsx
// No manual implementation needed
// Navigate to /chefs to see the list
```

### Navigating to Chef Detail
Click any chef card to navigate to their detail page:
```tsx
// Automatically handled by Link component in ChefCard
// URL format: /chefs/1, /chefs/2, etc.
```

## Styling

The implementation uses the existing color palette:
- `lapis` - Deep blue (brand color)
- `battleship` - Mid-gray
- `ash` - Light gray
- `tea` - Soft green
- `nyanza` - Lighter green

All components follow the existing design system with:
- Consistent border radius (`--radius: 0.75rem`)
- Gradient backgrounds
- Hover transitions
- Ring/border accents

## Browser Compatibility

- Modern browsers with ES6+ support
- Next.js 14+ required
- Client-side rendering for dynamic data

## Performance Considerations

1. **Data Transfer**: List view uses minimal data (ChefSummary)
2. **Image Optimization**: Next.js Image component handles optimization
3. **Code Splitting**: Dynamic routes are automatically split
4. **Loading States**: Prevent layout shift with skeleton screens

## Future Enhancements

Potential improvements:
- Add filtering/search functionality
- Implement pagination for large chef lists
- Add booking functionality
- Include chef ratings/reviews
- Add favorite/bookmark functionality
- Implement server-side rendering for SEO

