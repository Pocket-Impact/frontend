export type PricingPlan = {
  name: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
};

export const plans: PricingPlan[] = [
  {
    name: "Basic",
    price: 10,
    unit: "per user per month",
    description: "This is the basic pricing plan.",
    features: [
      "Just the basic feature",
      "The best feature",
      "The worst feature",
      "The better feature",
    ],
  },
  {
    name: "Business",
    price: 25,
    unit: "per user per month",
    description: "For small teams that need more control and collaboration.",
    features: [
      "Everything in Basic",
      "Advanced analytics",
      "Team collaboration tools",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: 50,
    unit: "per user per month",
    description: "Custom solutions for large organizations.",
    features: [
      "Everything in Business",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 premium support",
    ],
  },
];
