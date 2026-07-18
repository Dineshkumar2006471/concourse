import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';

// Note: To run this, you need a service account key from Firebase Console -> Project Settings -> Service Accounts
// Save it as service-account.json in the project root.
const serviceAccountPath = join(process.cwd(), 'service-account.json');

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  
  initializeApp({
    credential: cert(serviceAccount)
  });
  
  const db = getFirestore();
  
  const venues = [
    // US
    { id: 'metlife-stadium', name: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', capacity: 82500, lat: 40.8136, lng: -74.0745, timezone: 'America/New_York' },
    { id: 'att-stadium', name: 'AT&T Stadium', city: 'Dallas', country: 'USA', capacity: 80000, lat: 32.7473, lng: -97.0945, timezone: 'America/Chicago' },
    { id: 'arrowhead-stadium', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', capacity: 76416, lat: 39.0489, lng: -94.4839, timezone: 'America/Chicago' },
    { id: 'nrg-stadium', name: 'NRG Stadium', city: 'Houston', country: 'USA', capacity: 72220, lat: 29.6847, lng: -95.4107, timezone: 'America/Chicago' },
    { id: 'mercedes-benz-stadium', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: 71000, lat: 33.7554, lng: -84.4006, timezone: 'America/New_York' },
    { id: 'sofi-stadium', name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', capacity: 70240, lat: 33.9534, lng: -118.3387, timezone: 'America/Los_Angeles' },
    { id: 'lincoln-financial-field', name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', capacity: 69796, lat: 39.9012, lng: -75.1675, timezone: 'America/New_York' },
    { id: 'lumen-field', name: 'Lumen Field', city: 'Seattle', country: 'USA', capacity: 69000, lat: 47.5952, lng: -122.3316, timezone: 'America/Los_Angeles' },
    { id: 'levis-stadium', name: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'USA', capacity: 68500, lat: 37.4032, lng: -121.9698, timezone: 'America/Los_Angeles' },
    { id: 'gillette-stadium', name: 'Gillette Stadium', city: 'Boston', country: 'USA', capacity: 65878, lat: 42.0909, lng: -71.2643, timezone: 'America/New_York' },
    { id: 'hard-rock-stadium', name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', capacity: 64767, lat: 25.9580, lng: -80.2389, timezone: 'America/New_York' },
    // Mexico
    { id: 'estadio-azteca', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 87523, lat: 19.3029, lng: -99.1505, timezone: 'America/Mexico_City' },
    { id: 'estadio-bbva', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: 53500, lat: 25.6690, lng: -100.2445, timezone: 'America/Monterrey' },
    { id: 'estadio-akron', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: 49850, lat: 20.6817, lng: -103.4626, timezone: 'America/Mexico_City' },
    // Canada
    { id: 'bc-place', name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: 54500, lat: 49.2768, lng: -123.1120, timezone: 'America/Vancouver' },
    { id: 'bmo-field', name: 'BMO Field', city: 'Toronto', country: 'Canada', capacity: 45000, lat: 43.6332, lng: -79.4186, timezone: 'America/Toronto' }
  ];

  async function seed() {
    console.log('Seeding Venues...');
    for (const venue of venues) {
      const docRef = db.collection('venues').doc(venue.id);
      await docRef.set({
        name: venue.name,
        city: venue.city,
        country: venue.country,
        capacity: venue.capacity,
        lat: venue.lat,
        lng: venue.lng,
        timezone: venue.timezone,
        updatedAt: FieldValue.serverTimestamp()
      });
      console.log(`✅ Seeded ${venue.name}`);
      
      // Also seed some default gates and zones for a couple key stadiums (e.g. MetLife, SoFi, BMO)
      if (['metlife-stadium', 'sofi-stadium', 'bmo-field'].includes(venue.id)) {
        console.log(`  Seeding gates/zones for ${venue.name}...`);
        
        // Gates
        const gates = [
          { id: 'gate-a', name: 'Gate A', base_capacity_per_min: 150, step_free: true },
          { id: 'gate-b', name: 'Gate B', base_capacity_per_min: 120, step_free: false },
          { id: 'gate-c', name: 'Gate C (VIP)', base_capacity_per_min: 50, step_free: true }
        ];
        
        for (const gate of gates) {
          await docRef.collection('gates').doc(gate.id).set(gate);
        }
        
        // Zones
        const zones = [
          { id: 'zone-north-concourse', name: 'North Concourse', type: 'concourse' },
          { id: 'zone-south-concourse', name: 'South Concourse', type: 'concourse' },
          { id: 'zone-food-court-1', name: 'Main Food Court', type: 'concessions' },
          { id: 'zone-merch-1', name: 'Megastore', type: 'merchandise' }
        ];
        
        for (const zone of zones) {
          await docRef.collection('zones').doc(zone.id).set(zone);
        }
      }
    }
    
    // Seed Emission Factors
    const emissionFactors = [
      { id: 'car', kg_co2e_per_km: 0.192, source_citation: 'EPA 2024 Average Passenger Vehicle' },
      { id: 'transit', kg_co2e_per_km: 0.050, source_citation: 'APTA Average Public Transit' },
      { id: 'walk', kg_co2e_per_km: 0.0, source_citation: 'Standard' },
      { id: 'bike', kg_co2e_per_km: 0.0, source_citation: 'Standard' }
    ];
    
    for (const factor of emissionFactors) {
      await db.collection('emission_factors').doc(factor.id).set({
        kg_co2e_per_km: factor.kg_co2e_per_km,
        source_citation: factor.source_citation
      });
      console.log(`✅ Seeded Emission Factor: ${factor.id}`);
    }

    console.log('Seeding Complete! 🎉');
    process.exit(0);
  }

  seed().catch(console.error);

} catch (e) {
  console.log('Service account missing or invalid. Please download from Firebase Console.');
  console.log('Error:', e.message);
}
