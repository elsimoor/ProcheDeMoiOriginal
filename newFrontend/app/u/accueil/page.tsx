"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { gql, useQuery } from "@apollo/client";
import { Suspense } from "react";

const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      description
      images
    }
  }
`;

function AccueilContent() {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading restaurants...</div>;
  if (error) return <div className="flex h-screen items-center justify-center">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-[#FFF5F5] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center mb-12 text-gray-800">
          Choisissez un restaurant
        </h1>
        {/* Restaurant cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.restaurants.map((restaurant: any) => (
            <Card
              key={restaurant.id}
              className="overflow-hidden rounded-3xl border border-[#F2B8B6] bg-white shadow-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <img
                src={restaurant.images[0] || '/placeholder.jpg'}
                alt={restaurant.name}
                className="w-full h-64 object-cover"
              />
              {/* Card header with restaurant name */}
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  {restaurant.name}
                </CardTitle>
              </CardHeader>
              {/* Description */}
              <CardContent className="px-6 pt-4 pb-6">
                <p className="text-gray-600 mb-8 h-24 overflow-hidden">
                  {restaurant.description}
                </p>
              </CardContent>
              {/* Call‑to‑action */}
              <CardFooter className="bg-[#FFF5F5] p-6">
                <Button
                  asChild
                  className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white py-5 text-lg font-semibold shadow-none"
                >
                  <Link href={`/u/reserver?restaurantId=${restaurant.id}`}>
                    Réserver une table
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccueilPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <AccueilContent />
        </Suspense>
    )
}
