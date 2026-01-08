// Example API Response Formats
// This file shows what the backend API should return

// ============================================
// GET /api/chefs - List of chef summaries
// ============================================
export const EXAMPLE_CHEF_LIST_RESPONSE = [
  {
    "id": 1,
    "name": "Mario Rossi",
    "profilePicture": "/images/mario.jpg",
    "experience": 15,
    "foodOrigin": "Italian",
    "expertise": "Authentic Italian Pasta",
    "basePrice": 75
  },
  {
    "id": 2,
    "name": "Sophie Dubois",
    "profilePicture": "/images/sophie.jpg",
    "experience": 12,
    "foodOrigin": "French",
    "expertise": "Classic French Cuisine",
    "basePrice": 85
  },
  {
    "id": 3,
    "name": "Yuki Tanaka",
    "profilePicture": "/images/yuki.jpg",
    "experience": 10,
    "foodOrigin": "Japanese",
    "expertise": "Traditional Sushi & Sashimi",
    "basePrice": 90
  }
];

// ============================================
// GET /api/chefs/1 - Single chef detail
// ============================================
export const EXAMPLE_CHEF_DETAIL_RESPONSE = {
  "id": 1,
  "name": "Mario Rossi",
  "profilePicture": "/images/mario.jpg",
  "experience": 15,
  "foodOrigin": "Italian",
  "expertise": "Authentic Italian Pasta",
  "basePrice": 75,
  "about": "Passionate Italian chef with 15 years of experience in traditional Italian cuisine. Trained in Bologna and Naples, Mario brings authentic flavors and techniques to every dish. His passion for fresh, locally-sourced ingredients ensures every meal is a memorable experience.",
  "specialties": [
    "Homemade Fresh Pasta (Tagliatelle, Ravioli, Pappardelle)",
    "Traditional Risotto with Seasonal Ingredients",
    "Wood-fired Neapolitan Pizza",
    "Classic Italian Desserts (Tiramisu, Panna Cotta)",
    "Italian Wine Pairing Expertise"
  ],
  "setMenus": [
    "Italian Family Feast: Antipasti Misti, Fresh Tagliatelle Bolognese, Tiramisu - €75 pp",
    "Coastal Italian: Bruschetta, Seafood Risotto, Panna Cotta - €85 pp",
    "Tuscan Romance: Caprese, Osso Buco, Zabaglione - €95 pp"
  ],
  "dishGallery": [
    "/images/dishes/pasta1.jpg",
    "/images/dishes/pizza1.jpg",
    "/images/dishes/risotto1.jpg",
    "/images/dishes/tiramisu1.jpg",
    "/images/dishes/antipasti1.jpg"
  ],
  "extraInformation": "Available for events of 10-50 people. Vegetarian and gluten-free options available. Brings all necessary cooking equipment. Requires kitchen access 2 hours before service. Available weekdays and weekends."
};

// ============================================
// Additional Examples
// ============================================

export const EXAMPLE_FRENCH_CHEF = {
  "id": 2,
  "name": "Sophie Dubois",
  "profilePicture": "/images/sophie.jpg",
  "experience": 12,
  "foodOrigin": "French",
  "expertise": "Classic French Cuisine",
  "basePrice": 85,
  "about": "Classically trained at Le Cordon Bleu Paris, Sophie specializes in refined French cuisine with a modern twist. Her attention to detail and artistic plating make every dish a work of art.",
  "specialties": [
    "Coq au Vin",
    "Beef Bourguignon",
    "French Onion Soup",
    "Crème Brûlée"
  ],
  "setMenus": [
    "Parisian Evening: French Onion Soup, Coq au Vin, Tarte Tatin - €85 pp",
    "Provençal Delight: Ratatouille, Bouillabaisse, Crème Brûlée - €90 pp"
  ],
  "dishGallery": [
    "/images/dishes/coqauvin.jpg",
    "/images/dishes/bouillabaisse.jpg"
  ],
  "extraInformation": "Minimum 6 guests. Wine pairing recommendations provided. Available for private dinners and corporate events."
};

export const EXAMPLE_JAPANESE_CHEF = {
  "id": 3,
  "name": "Yuki Tanaka",
  "profilePicture": "/images/yuki.jpg",
  "experience": 10,
  "foodOrigin": "Japanese",
  "expertise": "Traditional Sushi & Sashimi",
  "basePrice": 90,
  "about": "Master sushi chef trained in Tokyo for 10 years. Yuki combines traditional techniques with premium ingredients to create an authentic Japanese dining experience.",
  "specialties": [
    "Omakase Sushi Experience",
    "Fresh Sashimi Selection",
    "Traditional Miso Soup"
  ],
  "setMenus": [
    "Sushi Omakase: Chef.ts's Selection of 12 Pieces Nigiri, Maki Rolls, Miso Soup - €90 pp"
  ],
  "dishGallery": [
    "/images/dishes/sushi1.jpg",
    "/images/dishes/sashimi1.jpg",
    "/images/dishes/maki1.jpg"
  ],
  "extraInformation": "Requires 24-hour advance notice for fresh fish orders. Minimum 4 guests. Sake pairing available."
};

