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

  // If there are restaurants available, use the first one to build a hero
  const restaurant = data?.restaurants?.[0];
  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      {restaurant && (
        <>
          {/* Navigation bar */}
          <header className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-800">{restaurant.name}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-lg font-medium text-gray-700">
              <Link href="#" className="hover:text-red-500">Accueil</Link>
              <Link href="#menus" className="hover:text-red-500">Menus</Link>
              <Link href="#galerie" className="hover:text-red-500">Galerie</Link>
              <Link href="#contact" className="hover:text-red-500">Contact</Link>
              <Link href={`/u/privatisation?restaurantId=${restaurant.id}`} className="px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600">Privatiser</Link>
              <Link href={`/u/reserver?restaurantId=${restaurant.id}`} className="px-6 py-3 rounded-full border border-red-500 text-red-500 hover:bg-red-50">Réserver</Link>
            </nav>
            {/* Placeholder for avatar */}
            <div className="hidden md:block w-8 h-8 rounded-full bg-gray-300" />
          </header>
          {/* Hero section */}
          <section className="relative flex items-center justify-center px-6">
            <img
              src={restaurant.images?.[0] || '/placeholder.jpg'}
              alt={restaurant.name}
              className="w-full max-h-[70vh] object-cover rounded-3xl"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl">Découvrez une Expérience Culinaire Inoubliable</h1>
              <p className="text-lg md:text-xl text-white max-w-2xl">
                Savourez des plats exquis dans un cadre élégant et chaleureux. Réservez votre table dès aujourd’hui pour une soirée mémorable.
              </p>
              <Link
                href="#restaurants"
                className="inline-block rounded-full bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold"
              >
                Réserver
              </Link>
            </div>
          </section>
          {/* Restaurants listing */}
          <section id="restaurants" className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center">Nos Restaurants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.restaurants.map((rest: any) => (
                  <Card
                    key={rest.id}
                    className="overflow-hidden rounded-3xl border border-[#F2B8B6] bg-white shadow-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <img
                      src={rest.images?.[0] || '/placeholder.jpg'}
                      alt={rest.name}
                      className="w-full h-56 object-cover"
                    />
                    <CardHeader className="p-6 pb-0">
                      <CardTitle className="text-2xl font-semibold text-gray-800">
                        {rest.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pt-4 pb-6">
                      <p className="text-gray-600 mb-8 h-24 overflow-hidden">
                        {rest.description}
                      </p>
                    </CardContent>
                    <CardFooter className="bg-[#FFF5F5] p-6">
                      <Button
                        asChild
                        className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white py-4 text-md font-semibold shadow-none"
                      >
                        <Link href={`/u/reserver?restaurantId=${rest.id}`}>
                          Réserver une table
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      {!restaurant && (
        <div className="flex h-screen items-center justify-center text-gray-600">
          Aucun restaurant disponible.
        </div>
      )}
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
