import React, { useState } from 'react';
import statesData from '../data/states.json';
import { MapPin, Trophy, Users, Search, List, Globe, CheckCircle } from 'lucide-react';
import { RangoliDivider } from '../utils/warliIcons';

export const IndiaMap = () => {
  const [selectedState, setSelectedState] = useState(statesData.states[0]); // Default to Maharashtra
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' | 'list'

  const filteredStates = statesData.states.filter((st) =>
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.hub.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.notablePlayers.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="map" className="relative py-20 px-4 sm:px-8 md:px-16 bg-paper-pure border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-peacock/10 text-peacock-dark text-xs font-bold uppercase tracking-wider mb-2">
            Regional Heartlands & Academies
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-yatra text-indigo">
            Where Kho Kho Lives in India
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal/80">
            Shaded by verified State Association status, championship records, and university hubs.
          </p>

          {/* Search Bar & View Toggle */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50" />
              <input
                type="text"
                placeholder="Search state, player (e.g. Parab, KLU), or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-paper border border-charcoal/20 focus:border-marigold focus:ring-1 focus:ring-marigold"
              />
            </div>

            <div className="flex items-center bg-paper border border-charcoal/20 rounded-full p-1 text-xs">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'map' ? 'bg-indigo text-white' : 'text-charcoal hover:text-indigo'
                }`}
              >
                Interactive Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'list' ? 'bg-indigo text-white' : 'text-charcoal hover:text-indigo'
                }`}
              >
                List View (Accessible)
              </button>
            </div>
          </div>
        </div>

        {/* Shading Legend Banner */}
        <div className="bg-paper p-3 rounded-xl border border-charcoal/15 text-xs text-charcoal/80 flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-marigold"></span>
            <span>Tier 1 National Powerhouses (Maharashtra, Andhra Pradesh, Karnataka, Gujarat)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-peacock"></span>
            <span>Active State Associations & University Hubs</span>
          </div>
          <div className="text-[11px] text-charcoal/60">
            Criterion: Verified KKFI state affiliations & national medal tallies
          </div>
        </div>

        {/* Map & Detail Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive SVG Map (7 Cols) */}
          {viewMode === 'map' ? (
            <div className="lg:col-span-7 bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full text-center text-xs text-charcoal/60 mb-2">
                Click any highlighted state to inspect association facts, trophies, and star players:
              </div>

              {/* Responsive SVG Map of India with Clickable Regions */}
              <div className="relative w-full max-w-lg aspect-[4/5] bg-paper-dark/30 rounded-xl p-2 border border-charcoal/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 500 580"
                  className="w-full h-full drop-shadow-md select-none"
                  aria-label="Interactive Map of India showing Kho Kho states"
                >
                  {/* Outline / Landmass Base */}
                  <path
                    d="M170,40 L220,70 L260,110 L300,140 L370,160 L450,180 L420,240 L360,250 L340,320 L270,420 L220,530 L190,540 L160,420 L120,320 L90,260 L90,200 L120,130 Z"
                    fill="#FFF6E5"
                    stroke="#D8CCB5"
                    strokeWidth="1.5"
                  />

                  {/* Render Detailed States from statesData */}
                  {statesData.states.map((st) => {
                    const isSelected = selectedState?.id === st.id;
                    const isTier1 = st.category.includes('Tier 1');

                    // Compute centroid approximate positions for label & click
                    return (
                      <g
                        key={st.id}
                        onClick={() => setSelectedState(st)}
                        className="cursor-pointer transition-all duration-200 group"
                      >
                        <path
                          d={st.path}
                          fill={isSelected ? '#C8341C' : isTier1 ? '#F28C28' : '#0E7C7B'}
                          fillOpacity={isSelected ? 0.95 : isTier1 ? 0.85 : 0.7}
                          stroke="#FFFFFF"
                          strokeWidth={isSelected ? 3 : 1.5}
                          className="hover:opacity-100 hover:brightness-110 transition-all"
                        />
                      </g>
                    );
                  })}

                  {/* Key State Badges overlay */}
                  <g className="pointer-events-none">
                    <text x="175" y="280" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">MH</text>
                    <text x="245" y="340" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">AP (KLU)</text>
                    <text x="185" y="370" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">KA</text>
                    <text x="230" y="295" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">TG</text>
                    <text x="310" y="260" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">OD</text>
                    <text x="135" y="225" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">GJ</text>
                    <text x="180" y="135" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">DL</text>
                    <text x="185" y="440" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">KL</text>
                    <text x="215" y="440" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">TN</text>
                    <text x="340" y="210" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">WB</text>
                    <text x="165" y="100" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">PB</text>
                  </g>
                </svg>
              </div>

              {/* State Quick Switcher Pills */}
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                {filteredStates.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedState(st)}
                    className={`px-2.5 py-1 text-xs rounded-full font-semibold transition-all ${
                      selectedState?.id === st.id
                        ? 'bg-kumkum text-white shadow'
                        : 'bg-paper-dark text-charcoal hover:bg-paper'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Accessible List View */
            <div className="lg:col-span-7 bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6 space-y-4 max-h-[600px] overflow-y-auto">
              <h3 className="font-yatra text-lg font-bold text-indigo">
                All Affiliated State Associations & Regional Records ({filteredStates.length})
              </h3>
              {filteredStates.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedState(st)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedState?.id === st.id
                      ? 'border-kumkum bg-kumkum/5 shadow-sm'
                      : 'border-charcoal/10 hover:border-marigold'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-base text-indigo font-bold">{st.name}</strong>
                    <span className="text-xs font-semibold text-kumkum">{st.championshipTitles} Titles</span>
                  </div>
                  <p className="text-xs text-charcoal/70">{st.stateAssociation}</p>
                  <p className="text-xs text-charcoal/90 mt-1">{st.facts}</p>
                </div>
              ))}
            </div>
          )}

          {/* Right: Selected State Dossier Card (5 Cols) */}
          <div className="lg:col-span-5 bg-paper rounded-2xl border-2 border-charcoal/15 shadow-clay p-6 sticky top-24">
            {selectedState ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
                  <div>
                    <span className="text-xs font-bold text-marigold uppercase tracking-wider block">
                      {selectedState.category}
                    </span>
                    <h3 className="text-2xl font-bold font-yatra text-indigo">
                      {selectedState.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-yatra text-kumkum">
                      {selectedState.championshipTitles}
                    </span>
                    <span className="text-[10px] text-charcoal/70 block uppercase font-bold">Titles</span>
                  </div>
                </div>

                {/* Association Name */}
                <div className="bg-paper-pure p-3 rounded-xl border border-charcoal/10">
                  <div className="text-[11px] font-bold text-charcoal/60 uppercase">Governing State Body</div>
                  <strong className="text-sm text-indigo font-bold">{selectedState.stateAssociation}</strong>
                </div>

                {/* Regional Hubs */}
                <div className="flex items-start gap-2 text-xs text-charcoal/80">
                  <MapPin className="w-4 h-4 text-kumkum shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-charcoal">Major Training Hubs: </span>
                    {selectedState.hub}
                  </div>
                </div>

                {/* Key Facts / Traditions */}
                <div className="bg-turmeric/10 border-l-4 border-turmeric p-3 rounded-r-xl text-xs text-charcoal/90 leading-relaxed">
                  <strong className="block text-indigo font-bold mb-1">Historical & Modern Impact:</strong>
                  {selectedState.facts}
                </div>

                {/* Notable Players */}
                <div>
                  <div className="text-xs font-bold text-indigo uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-marigold" />
                    <span>Notable Champions & Awardees</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedState.notablePlayers.map((player, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-lg bg-paper-pure border border-charcoal/15 font-medium text-charcoal"
                      >
                        {player}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Tournament */}
                <div className="pt-2 border-t border-charcoal/10 text-xs">
                  <span className="text-charcoal/60 font-semibold block">Flagship State Championship:</span>
                  <strong className="text-indigo font-bold text-xs">{selectedState.activeTournament}</strong>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-charcoal/50 text-sm">
                Select any state on the map to explore its Kho Kho records.
              </div>
            )}
          </div>
        </div>
      </div>

      <RangoliDivider />
    </section>
  );
};
