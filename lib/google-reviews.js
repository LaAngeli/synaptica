import { businessContact } from "./businessContact";

/**
 * Recenzii Google via Places API (New), server-side.
 * Termenii Google interzic stocarea pe termen lung a conținutului Places (doar place_id e exceptat),
 * așa că datele se re-preiau periodic (revalidate), nu se persistă într-o bază de date.
 * Fără chei configurate → set demonstrativ, ca secțiunea să se vadă în dev.
 *
 * NB: NU marca aceste recenzii cu aggregateRating/review în JSON-LD — Google le tratează drept
 * „self-serving" și nu afișează stele în rezultate (regula din 2019).
 */

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places/";
const REVALIDATE_SECONDS = 21600; // 6h
const FIELD_MASK = "rating,userRatingCount,googleMapsUri,reviews";

function initialsOf(name) {
  if (!name) return "G";
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0] || "")
      .join("")
      .toUpperCase() || "G"
  );
}

const FALLBACK_REVIEWS = [
  {
    author: "Andreea Marina",
    rating: 5,
    time: "acum 2 săptămâni",
    text: "După 10 ședințe de neurofeedback dorm mult mai bine și îmi țin concentrarea la serviciu. Echipă caldă și profesionistă, explică fiecare pas.",
  },
  {
    author: "Bogdan Popa",
    rating: 5,
    time: "acum o lună",
    text: "Am ajuns pentru anxietate, iar evaluarea EEG de la început mi-a dat încredere. Recomand cu toată inima, s-a văzut diferența.",
  },
  {
    author: "Ioana Rus",
    rating: 5,
    time: "acum 3 luni",
    text: "Locație curată, primire caldă și protocol personalizat. Copilul meu s-a liniștit vizibil după primele săptămâni.",
  },
  {
    author: "Cristina Deac",
    rating: 5,
    time: "acum 3 săptămâni",
    text: "Profesionalism și răbdare. Am simțit că sunt ascultată, nu doar o programare în plus.",
  },
  {
    author: "Vlad Munteanu",
    rating: 5,
    time: "acum o lună",
    text: "Tehnologie serioasă și rezultate reale la stres. Merită fiecare ședință.",
  },
];

function buildFallback() {
  return {
    source: "fallback",
    rating: 4.9,
    total: 87,
    mapsUrl: businessContact.hasMap,
    writeReviewUrl: businessContact.hasMap,
    reviews: FALLBACK_REVIEWS.map((review) => ({
      author: review.author,
      initials: initialsOf(review.author),
      photo: null,
      rating: review.rating,
      time: review.time,
      text: review.text,
      authorUrl: null,
    })),
  };
}

function normalizeReview(review) {
  const author = review?.authorAttribution?.displayName || "Utilizator Google";
  const text = (review?.text?.text || review?.originalText?.text || "").trim();
  return {
    author,
    initials: initialsOf(author),
    photo: review?.authorAttribution?.photoUri || null,
    rating: typeof review?.rating === "number" ? review.rating : 5,
    time: review?.relativePublishTimeDescription || "",
    text,
    authorUrl: review?.authorAttribution?.uri || null,
  };
}

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return buildFallback();
  }

  try {
    const response = await fetch(`${PLACES_ENDPOINT}${encodeURIComponent(placeId)}?languageCode=ro`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return buildFallback();
    }

    const place = await response.json();
    const reviews = (place.reviews || []).map(normalizeReview).filter((review) => review.text);

    if (!reviews.length) {
      return buildFallback();
    }

    return {
      source: "google",
      rating: typeof place.rating === "number" ? place.rating : null,
      total: typeof place.userRatingCount === "number" ? place.userRatingCount : reviews.length,
      mapsUrl: place.googleMapsUri || businessContact.hasMap,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
      reviews,
    };
  } catch {
    return buildFallback();
  }
}
