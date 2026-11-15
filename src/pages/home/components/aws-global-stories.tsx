import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Globe2, MapPin, ShieldCheck } from 'lucide-react'

import { AWS_CUSTOMER_STORIES, AWS_GLOBAL_REGIONS } from '@/_mocks/aws-landing.data'
import { scrollToSection } from '@/pages/home/aws-helpers'

const GLOBE_RADIUS = 138
const GLOBE_CENTER = 170

function projectPoint(latDeg: number, lonDeg: number, rotLonDeg: number, rotLatDeg: number) {
  const lat = (latDeg * Math.PI) / 180
  const lon = ((lonDeg - rotLonDeg) * Math.PI) / 180
  const tilt = (rotLatDeg * Math.PI) / 180

  const x0 = Math.cos(lat) * Math.sin(lon)
  const y0 = Math.sin(lat)
  const z0 = Math.cos(lat) * Math.cos(lon)

  const y1 = y0 * Math.cos(tilt) - z0 * Math.sin(tilt)
  const z1 = y0 * Math.sin(tilt) + z0 * Math.cos(tilt)

  return {
    x: GLOBE_CENTER + GLOBE_RADIUS * x0,
    y: GLOBE_CENTER - GLOBE_RADIUS * y1,
    z: z1,
    visible: z1 > -0.08
  }
}

function buildGraticuleArc(points: Array<{ lat: number; lon: number }>, rotLonDeg: number, rotLatDeg: number): string {
  let d = ''
  let drawing = false

  for (const pt of points) {
    const p = projectPoint(pt.lat, pt.lon, rotLonDeg, rotLatDeg)
    if (p.z > 0) {
      d += `${drawing ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)} `
      drawing = true
    } else {
      drawing = false
    }
  }
  return d
}

interface RotatingAwsGlobeProps {
  activeContinentId: string
  activeRegionName: string
  activeRegionCode: string
  onSelectContinent: (id: string) => void
}

function RotatingAwsGlobe({
  activeContinentId,
  activeRegionName,
  activeRegionCode,
  onSelectContinent
}: RotatingAwsGlobeProps) {
  const activeContinent = AWS_GLOBAL_REGIONS.find((c) => c.id === activeContinentId) ?? AWS_GLOBAL_REGIONS[0]

  const [rotation, setRotation] = useState({ lon: activeContinent.lon, lat: activeContinent.lat * 0.45 })
  const targetRef = useRef({ lon: activeContinent.lon, lat: activeContinent.lat * 0.45 })
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0, lon: 0, lat: 0 })

  useEffect(() => {
    targetRef.current = { lon: activeContinent.lon, lat: activeContinent.lat * 0.45 }
  }, [activeContinent.lon, activeContinent.lat])

  useEffect(() => {
    let rafId = 0
    const tick = () => {
      if (!isDraggingRef.current) {
        // Gentle idle drift + smooth spring interpolation toward selected continent
        setRotation((prev) => {
          const dLon = ((targetRef.current.lon - prev.lon + 540) % 360) - 180
          const dLat = targetRef.current.lat - prev.lat
          if (Math.abs(dLon) < 0.05 && Math.abs(dLat) < 0.05) {
            return prev
          }
          return {
            lon: prev.lon + dLon * 0.08,
            lat: prev.lat + dLat * 0.08
          }
        })
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const graticulePaths: string[] = []
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = []
    for (let lon = -180; lon <= 180; lon += 10) pts.push({ lat, lon })
    graticulePaths.push(buildGraticuleArc(pts, rotation.lon, rotation.lat))
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts = []
    for (let lat = -80; lat <= 80; lat += 10) pts.push({ lat, lon })
    graticulePaths.push(buildGraticuleArc(pts, rotation.lon, rotation.lat))
  }

  const projectedNodes = AWS_GLOBAL_REGIONS.map((continent) => ({
    ...continent,
    proj: projectPoint(continent.lat, continent.lon, rotation.lon, rotation.lat)
  }))

  const activeNode = projectedNodes.find((n) => n.id === activeContinentId) ?? projectedNodes[0]

  return (
    <div className='lg:col-span-7 relative rounded-lg bg-[#0F141A] border border-slate-800 p-6 flex flex-col justify-between overflow-hidden min-h-[380px]'>
      <div className='flex items-center justify-between gap-3 relative z-10'>
        <div className='inline-flex items-center gap-2 text-xs font-mono text-slate-300'>
          <Globe2 className='w-4 h-4 text-[#FF9900]' />
          <span>AWS Global Network • Kéo để xoay quả địa cầu</span>
        </div>
        <span className='font-mono text-xs text-emerald-400'>Active: {activeRegionCode}</span>
      </div>

      <div className='flex items-center justify-center my-2'>
        <svg
          viewBox='0 0 340 340'
          className='w-full max-w-[340px] h-auto select-none cursor-grab active:cursor-grabbing touch-none'
          aria-label='Quả địa cầu mạng lưới AWS toàn cầu'
          onPointerDown={(e) => {
            isDraggingRef.current = true
            dragStartRef.current = { x: e.clientX, y: e.clientY, lon: rotation.lon, lat: rotation.lat }
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            if (!isDraggingRef.current) return
            const dx = e.clientX - dragStartRef.current.x
            const dy = e.clientY - dragStartRef.current.y
            const nextLon = dragStartRef.current.lon - dx * 0.45
            const nextLat = Math.max(-55, Math.min(55, dragStartRef.current.lat + dy * 0.35))
            targetRef.current = { lon: nextLon, lat: nextLat }
            setRotation({ lon: nextLon, lat: nextLat })
          }}
          onPointerUp={() => {
            isDraggingRef.current = false
          }}
        >
          <defs>
            <radialGradient id='awsGlobeFill' cx='38%' cy='32%' r='70%'>
              <stop offset='0%' stopColor='#1e3a5f' stopOpacity='0.95' />
              <stop offset='55%' stopColor='#132033' stopOpacity='0.98' />
              <stop offset='100%' stopColor='#090d12' stopOpacity='1' />
            </radialGradient>
          </defs>

          {/* Outer Atmosphere Ring */}
          <circle
            cx={GLOBE_CENTER}
            cy={GLOBE_CENTER}
            r={GLOBE_RADIUS + 6}
            fill='none'
            stroke='#38bdf8'
            strokeOpacity='0.16'
            strokeWidth='1.5'
          />

          {/* Sphere Base */}
          <circle
            cx={GLOBE_CENTER}
            cy={GLOBE_CENTER}
            r={GLOBE_RADIUS}
            fill='url(#awsGlobeFill)'
            stroke='#334155'
            strokeWidth='1.2'
          />

          {/* Graticule Lines */}
          <g stroke='#38bdf8' strokeOpacity='0.18' strokeWidth='0.8' fill='none'>
            {graticulePaths.map((d, idx) => (d ? <path key={idx} d={d} /> : null))}
          </g>

          {/* Animated Backbone Arcs between visible nodes */}
          {activeNode.proj.visible &&
            projectedNodes
              .filter((n) => n.id !== activeNode.id && n.proj.visible)
              .map((node) => {
                const mx = (activeNode.proj.x + node.proj.x) / 2
                const my = (activeNode.proj.y + node.proj.y) / 2 - 22
                return (
                  <motion.path
                    key={`arc-${node.id}`}
                    d={`M${activeNode.proj.x.toFixed(1)},${activeNode.proj.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${node.proj.x.toFixed(1)},${node.proj.y.toFixed(1)}`}
                    fill='none'
                    stroke='#FF9900'
                    strokeOpacity='0.45'
                    strokeWidth='1.3'
                    strokeDasharray='4 4'
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -16 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                  />
                )
              })}

          {/* Region Nodes */}
          {projectedNodes.map((node) => {
            if (!node.proj.visible) return null
            const isCurrent = node.id === activeContinentId
            return (
              <g key={node.id} onClick={() => onSelectContinent(node.id)} className='cursor-pointer'>
                {isCurrent && (
                  <motion.circle
                    cx={node.proj.x}
                    cy={node.proj.y}
                    r={14}
                    fill='#FF9900'
                    initial={{ scale: 0.6, opacity: 0.5 }}
                    animate={{ scale: [0.7, 1.5, 0.7], opacity: [0.45, 0.08, 0.45] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  />
                )}
                <circle
                  cx={node.proj.x}
                  cy={node.proj.y}
                  r={isCurrent ? 6 : 4}
                  fill={isCurrent ? '#FF9900' : '#38bdf8'}
                  stroke='#0F141A'
                  strokeWidth='1.5'
                />
                <text
                  x={node.proj.x + 9}
                  y={node.proj.y + 3}
                  fontSize='9.5'
                  fontWeight={isCurrent ? '700' : '500'}
                  fill={isCurrent ? '#ffffff' : '#94a3b8'}
                >
                  {node.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className='relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800 text-xs text-slate-300'>
        <span className='inline-flex items-center gap-1.5'>
          <MapPin className='w-3.5 h-3.5 text-[#FF9900]' />
          Đang chọn: <strong className='text-white'>{activeRegionName}</strong>
        </span>
        <span className='font-mono text-slate-400'>Multi-AZ • 100GbE Backbone</span>
      </div>
    </div>
  )
}

export function AwsGlobalStories() {
  const [storyIndex, setStoryIndex] = useState(0)
  const [activeContinentId, setActiveContinentId] = useState(AWS_GLOBAL_REGIONS[0].id)
  const [selectedRegionCode, setSelectedRegionCode] = useState(AWS_GLOBAL_REGIONS[0].regions[0].code)

  const totalStories = AWS_CUSTOMER_STORIES.length
  const activeStory = AWS_CUSTOMER_STORIES[storyIndex]

  const activeContinent =
    AWS_GLOBAL_REGIONS.find((continent) => continent.id === activeContinentId) ?? AWS_GLOBAL_REGIONS[0]
  const activeRegion =
    activeContinent.regions.find((region) => region.code === selectedRegionCode) ?? activeContinent.regions[0]

  const handlePrevStory = () => {
    setStoryIndex((prev) => (prev === 0 ? totalStories - 1 : prev - 1))
  }

  const handleNextStory = () => {
    setStoryIndex((prev) => (prev + 1) % totalStories)
  }

  const handleSelectContinent = (continentId: string) => {
    setActiveContinentId(continentId)
    const nextContinent = AWS_GLOBAL_REGIONS.find((c) => c.id === continentId)
    if (nextContinent?.regions[0]) {
      setSelectedRegionCode(nextContinent.regions[0].code)
    }
  }

  return (
    <>
      {/* Section 1: Customer Stories Carousel */}
      <section
        id='stories'
        className='scroll-mt-16 md:scroll-mt-24 py-20 bg-white dark:bg-[#0F141A] border-b border-slate-200 dark:border-slate-800'
      >
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold text-[#0F141A] dark:text-white sm:text-4xl'>
                Từ startup đến tập đoàn toàn cầu, các đội ngũ kỹ thuật chọn AWS để đổi mới
              </h2>
              <p className='mt-3 text-slate-600 dark:text-slate-400 max-w-[60ch]'>
                Khám phá cách các doanh nghiệp rút ngắn thời gian triển khai sản phẩm và tối ưu vận hành trên hạ tầng
                đám mây.
              </p>
            </div>

            <button
              type='button'
              onClick={() => scrollToSection('#contact')}
              className='shrink-0 self-start md:self-auto text-sm font-semibold text-[#0066CC] dark:text-[#FF9900] hover:underline'
            >
              Trao đổi với kiến trúc sư AWS
            </button>
          </div>

          <div className='rounded-xl overflow-hidden bg-[#0F141A] text-white border border-slate-800'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className='grid grid-cols-1 lg:grid-cols-12'
              >
                <div className='relative min-h-[260px] lg:min-h-[380px] lg:col-span-7 bg-[#161D26] overflow-hidden'>
                  <img
                    src={activeStory.imageSrc}
                    alt={activeStory.imageAlt}
                    className='w-full h-full object-cover opacity-90'
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0F141A] via-[#0F141A]/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0F141A]/40 lg:to-[#0F141A]' />
                  <span className='absolute top-5 left-5 px-3 py-1 text-xs font-medium rounded-md bg-[#0F141A]/80 text-slate-200 border border-white/15 backdrop-blur-sm'>
                    {activeStory.industry}
                  </span>
                </div>

                <div className='lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-[#0F141A]'>
                  <div>
                    <p className='font-mono text-xs text-[#FF9900]'>{activeStory.company}</p>
                    <h3 className='mt-2 text-2xl font-bold text-white leading-snug'>{activeStory.title}</h3>
                    <p className='mt-4 text-sm text-slate-300 leading-relaxed'>{activeStory.summary}</p>
                  </div>

                  <div className='mt-8 pt-5 border-t border-slate-800'>
                    <p className='text-xs text-slate-400'>Kết quả đạt được</p>
                    <p className='mt-1 text-sm font-semibold text-white'>{activeStory.impact}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='flex items-center justify-center mt-6'>
            <div className='inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0F141A] dark:bg-[#161D26] text-white border border-slate-700'>
              <button
                type='button'
                onClick={handlePrevStory}
                aria-label='Câu chuyện trước'
                className='p-1 rounded-full hover:bg-white/10 transition-colors'
              >
                <ChevronLeft className='w-4 h-4' />
              </button>
              <span className='font-mono text-xs px-2 select-none'>
                {storyIndex + 1} / {totalStories}
              </span>
              <button
                type='button'
                onClick={handleNextStory}
                aria-label='Câu chuyện tiếp theo'
                className='p-1 rounded-full hover:bg-white/10 transition-colors'
              >
                <ChevronRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AWS Global Infrastructure Explorer */}
      <section
        id='infrastructure'
        className='scroll-mt-16 md:scroll-mt-24 py-20 bg-[#F3F4F6] dark:bg-[#161D26] border-b border-slate-200 dark:border-slate-800'
      >
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <h2 className='text-3xl font-bold text-[#0F141A] dark:text-white sm:text-4xl'>
              Cơ sở hạ tầng toàn cầu của AWS
            </h2>
            <p className='mt-3 text-slate-600 dark:text-slate-400 max-w-[65ch]'>
              Đám mây AWS hoạt động trên 105 Vùng sẵn sàng tại 33 Khu vực địa lý, cho phép chọn vùng đặt máy chủ gần
              người dùng Việt Nam nhất để tối ưu độ trễ.
            </p>
          </div>

          {/* Continent Tabs */}
          <div className='mt-8 inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0F141A] border border-slate-300 dark:border-slate-700'>
            {AWS_GLOBAL_REGIONS.map((continent) => {
              const isActive = continent.id === activeContinent.id
              return (
                <button
                  key={continent.id}
                  type='button'
                  onClick={() => handleSelectContinent(continent.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#0F141A] text-white dark:bg-[#FF9900] dark:text-[#0F141A]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {continent.name}
                </button>
              )
            })}
          </div>

          <div className='grid grid-cols-1 gap-6 mt-8 lg:grid-cols-12 items-stretch'>
            <div className='lg:col-span-5 flex flex-col rounded-lg bg-white dark:bg-[#0F141A] border border-slate-200 dark:border-slate-800 overflow-hidden'>
              <div className='p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between'>
                <div>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>Khu vực địa lý AWS</p>
                  <h3 className='mt-0.5 text-lg font-bold text-[#0F141A] dark:text-white'>{activeContinent.name}</h3>
                </div>
                <span className='font-mono text-xs px-2.5 py-1 rounded bg-[#F3F4F6] dark:bg-[#161D26] text-[#0F141A] dark:text-slate-200 border border-slate-200 dark:border-slate-700'>
                  {activeContinent.regions.length} Regions
                </span>
              </div>

              <div className='p-3 space-y-1.5 max-h-[300px] overflow-y-auto'>
                {activeContinent.regions.map((region) => {
                  const selected = region.code === activeRegion.code
                  return (
                    <button
                      key={region.code}
                      type='button'
                      onClick={() => setSelectedRegionCode(region.code)}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-md text-left text-sm transition-colors ${
                        selected
                          ? 'bg-[#0F141A] text-white dark:bg-[#FF9900]/15 dark:text-[#FF9900] border border-[#0F141A] dark:border-[#FF9900]/50'
                          : 'text-[#0F141A] dark:text-slate-300 hover:bg-[#F3F4F6] dark:hover:bg-slate-800/70 border border-transparent'
                      }`}
                    >
                      <span className='flex items-center gap-2 min-w-0'>
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            selected ? 'bg-[#FF9900]' : 'bg-slate-400 dark:bg-slate-600'
                          }`}
                        />
                        <span className='truncate font-medium'>{region.name}</span>
                      </span>
                      <span
                        className={`font-mono text-xs shrink-0 ${
                          selected ? 'text-slate-300 dark:text-[#FF9900]' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {region.code}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className='mt-auto p-4 bg-[#F3F4F6] dark:bg-[#161D26] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs'>
                <div className='flex items-center gap-2 text-[#0F141A] dark:text-slate-200'>
                  <ShieldCheck className='w-4 h-4 text-[#FF9900] shrink-0' />
                  <span>
                    <strong>{activeRegion.azCount} Availability Zones</strong> • {activeRegion.latencyNote}
                  </span>
                </div>
              </div>
            </div>

            <RotatingAwsGlobe
              activeContinentId={activeContinent.id}
              activeRegionName={activeRegion.name}
              activeRegionCode={activeRegion.code}
              onSelectContinent={handleSelectContinent}
            />
          </div>
        </div>
      </section>
    </>
  )
}
