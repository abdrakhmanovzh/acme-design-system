import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconSettings
} from '@tabler/icons-react'
import type { ComponentProps, HTMLProps, ReactNode, RefObject } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu'
import { Spinner } from '#/components/ui/spinner'
import { cn } from '#/lib/cn'

function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const formattedMins = mins < 10 ? `0${mins}` : mins
  const formattedSecs = secs < 10 ? `0${secs}` : secs

  return hrs > 0
    ? `${hrs}:${formattedMins}:${formattedSecs}`
    : `${mins}:${formattedSecs}`
}

export type AudioPlayerPeaks = number[] | { left: number[]; right: number[] }

export interface AudioPlayerItem<TData = unknown> {
  id: string | number
  src: string
  data?: TData
  peaks?: AudioPlayerPeaks
}

interface AudioPlayerApi<TData = unknown> {
  ref: RefObject<HTMLAudioElement | null>
  activeItem: AudioPlayerItem<TData> | null
  duration: number | undefined
  error: MediaError | null
  isPlaying: boolean
  isBuffering: boolean
  playbackRate: number
  volume: number
  muted: boolean
  isItemActive: (id: string | number | null) => boolean
  setActiveItem: (item: AudioPlayerItem<TData> | null) => Promise<void>
  play: (item?: AudioPlayerItem<TData> | null) => Promise<void>
  pause: () => Promise<void>
  seek: (time: number) => void
  setPlaybackRate: (rate: number) => void
  setVolume: (volume: number) => void
  setMuted: (muted: boolean) => void
}

const AudioPlayerContext = createContext<AudioPlayerApi<unknown> | null>(null)

export function useAudioPlayer<TData = unknown>(): AudioPlayerApi<TData> {
  const api = useContext(AudioPlayerContext) as AudioPlayerApi<TData> | null
  if (!api) {
    throw new Error(
      'useAudioPlayer cannot be called outside of AudioPlayerProvider'
    )
  }
  return api
}

const AudioPlayerTimeContext = createContext<number | null>(null)

export const useAudioPlayerTime = () => {
  const time = useContext(AudioPlayerTimeContext)
  if (time === null) {
    throw new Error(
      'useAudioPlayerTime cannot be called outside of AudioPlayerProvider'
    )
  }
  return time
}

export interface AudioPlayerProviderProps<TData = unknown> {
  children: ReactNode
  crossOrigin?: HTMLProps<HTMLAudioElement>['crossOrigin']
  initialItem?: AudioPlayerItem<TData>
  onEnded?: (item: AudioPlayerItem<TData> | null) => void
}

export function AudioPlayerProvider<TData = unknown>({
  children,
  crossOrigin,
  initialItem,
  onEnded
}: AudioPlayerProviderProps<TData>) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const itemRef = useRef<AudioPlayerItem<TData> | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const onEndedRef = useRef(onEnded)
  const [time, setTime] = useState<number>(0)
  const [duration, setDuration] = useState<number | undefined>(undefined)
  const [error, setError] = useState<MediaError | null>(null)
  const [activeItem, setActiveItemState] =
    useState<AudioPlayerItem<TData> | null>(null)
  const [paused, setPaused] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [playbackRate, setPlaybackRateState] = useState<number>(1)
  const [volume, setVolumeState] = useState<number>(1)
  const [muted, setMutedState] = useState(false)

  useEffect(() => {
    onEndedRef.current = onEnded
  }, [onEnded])

  const initialItemRef = useRef(initialItem)

  const loadItem = useCallback((item: AudioPlayerItem<TData> | null) => {
    const audio = audioRef.current
    if (!audio) return
    itemRef.current = item
    setActiveItemState(item)
    const currentRate = audio.playbackRate
    if (!audio.paused) audio.pause()
    audio.currentTime = 0
    if (item === null) {
      audio.removeAttribute('src')
    } else {
      audio.src = item.src
    }
    audio.load()
    audio.playbackRate = currentRate
  }, [])

  const setActiveItem = useCallback(
    async (item: AudioPlayerItem<TData> | null) => {
      if (!audioRef.current) return
      if (item?.id === itemRef.current?.id) return
      loadItem(item)
    },
    [loadItem]
  )

  const play = useCallback(
    async (item?: AudioPlayerItem<TData> | null) => {
      const audio = audioRef.current
      if (!audio) return

      if (playPromiseRef.current) {
        try {
          await playPromiseRef.current
        } catch (e) {
          console.error('Play promise error:', e)
        }
      }

      const sameItem = item === undefined || item?.id === itemRef.current?.id
      if (!sameItem) {
        loadItem(item ?? null)
      }

      const playPromise = audio.play()
      playPromiseRef.current = playPromise
      return playPromise
    },
    [loadItem]
  )

  const pause = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current
      } catch (e) {
        console.error(e)
      }
    }

    audio.pause()
    playPromiseRef.current = null
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setTime(time)
  }, [])

  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = rate
  }, [])

  const setVolume = useCallback((next: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = Math.max(0, Math.min(1, next))
  }, [])

  const setMuted = useCallback((next: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = next
  }, [])

  const isItemActive = useCallback(
    (id: string | number | null) => activeItem?.id === id,
    [activeItem]
  )

  useEffect(() => {
    if (initialItemRef.current) loadItem(initialItemRef.current)
  }, [loadItem])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoadedMetadata = () => setDuration(audio.duration)
    const onDurationChange = () => setDuration(audio.duration)
    const onPlay = () => setPaused(false)
    const onPause = () => setPaused(true)
    const onRateChange = () => setPlaybackRateState(audio.playbackRate)
    const onVolumeChange = () => {
      setVolumeState(audio.volume)
      setMutedState(audio.muted)
    }
    const onErr = () => setError(audio.error)
    const onWaiting = () => setIsBuffering(true)
    const onCanPlay = () => setIsBuffering(false)
    const onPlaying = () => setIsBuffering(false)
    const onStalled = () => setIsBuffering(true)
    const onEndedEvent = () => onEndedRef.current?.(itemRef.current)
    const onEmptied = () => {
      setDuration(undefined)
      setError(null)
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ratechange', onRateChange)
    audio.addEventListener('volumechange', onVolumeChange)
    audio.addEventListener('error', onErr)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('stalled', onStalled)
    audio.addEventListener('ended', onEndedEvent)
    audio.addEventListener('emptied', onEmptied)

    setVolumeState(audio.volume)
    setMutedState(audio.muted)
    setPlaybackRateState(audio.playbackRate)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ratechange', onRateChange)
      audio.removeEventListener('volumechange', onVolumeChange)
      audio.removeEventListener('error', onErr)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('stalled', onStalled)
      audio.removeEventListener('ended', onEndedEvent)
      audio.removeEventListener('emptied', onEmptied)
    }
  }, [])

  useAnimationFrame(() => {
    const audio = audioRef.current
    if (!audio) return
    const next = audio.currentTime
    setTime((prev) => (prev === next ? prev : next))
  })

  const isPlaying = !paused

  const api = useMemo<AudioPlayerApi<TData>>(
    () => ({
      ref: audioRef,
      duration,
      error,
      isPlaying,
      isBuffering,
      activeItem,
      playbackRate,
      volume,
      muted,
      isItemActive,
      setActiveItem,
      play,
      pause,
      seek,
      setPlaybackRate,
      setVolume,
      setMuted
    }),
    [
      duration,
      error,
      isPlaying,
      isBuffering,
      activeItem,
      playbackRate,
      volume,
      muted,
      isItemActive,
      setActiveItem,
      play,
      pause,
      seek,
      setPlaybackRate,
      setVolume,
      setMuted
    ]
  )

  return (
    <AudioPlayerContext.Provider value={api as AudioPlayerApi<unknown>}>
      <AudioPlayerTimeContext.Provider value={time}>
        <audio ref={audioRef} className="hidden" crossOrigin={crossOrigin} />
        {children}
      </AudioPlayerTimeContext.Provider>
    </AudioPlayerContext.Provider>
  )
}

export const AudioPlayerProgress = ({
  className,
  onValueChange,
  onValueCommitted,
  onPointerDown,
  onPointerUp,
  onKeyDown,
  step = 0.25,
  ...props
}: Omit<
  ComponentProps<typeof SliderPrimitive.Root>,
  'min' | 'max' | 'value'
>) => {
  const player = useAudioPlayer()
  const time = useAudioPlayerTime()
  const wasPlayingRef = useRef(false)
  const [scrubbingValue, setScrubbingValue] = useState<number | null>(null)
  const disabled =
    player.duration === undefined ||
    !Number.isFinite(player.duration) ||
    Number.isNaN(player.duration)

  const displayValue = scrubbingValue ?? time

  return (
    <SliderPrimitive.Root
      data-slot="audio-player-progress"
      className={cn(
        'relative flex touch-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-44',
        className
      )}
      value={[displayValue]}
      min={0}
      max={disabled ? 1 : (player.duration ?? 1)}
      step={step}
      disabled={disabled}
      thumbAlignment="center"
      onValueChange={(value, details) => {
        const nextTime = Array.isArray(value) ? value[0] : value
        setScrubbingValue(nextTime ?? 0)
        onValueChange?.(value, details)
      }}
      onValueCommitted={(value, details) => {
        const nextTime = Array.isArray(value) ? value[0] : value
        player.seek(nextTime ?? 0)
        setScrubbingValue(null)
        onValueCommitted?.(value, details)
      }}
      onKeyDown={(event) => {
        if (event.key === ' ') {
          event.preventDefault()
          if (player.isPlaying) {
            player.pause()
          } else {
            player.play()
          }
        }
        onKeyDown?.(event)
      }}
      {...props}
    >
      <SliderPrimitive.Control
        className="group/player relative flex touch-none items-center data-[orientation=horizontal]:min-h-8 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:min-w-8 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-center"
        onPointerDown={(event) => {
          wasPlayingRef.current = player.isPlaying
          player.pause()
          onPointerDown?.(event)
        }}
        onPointerUp={(event) => {
          if (wasPlayingRef.current) {
            player.play()
          }
          onPointerUp?.(event)
        }}
      >
        <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-muted select-none data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1">
          <SliderPrimitive.Indicator className="absolute rounded-full bg-primary transition-[width,height] duration-300 ease-out-quint select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full motion-reduce:transition-none" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          index={0}
          aria-label="Seek"
          getAriaValueText={(_, value) =>
            `${formatTime(value)} of ${formatTime(disabled ? 0 : (player.duration ?? 0))}`
          }
          className="block size-3 shrink-0 rounded-full border border-primary bg-background opacity-0 shadow-sm transition-[opacity,transform,box-shadow] duration-150 ease-out-quint select-none group-hover/player:opacity-100 active:scale-95 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focused:opacity-100 data-focused:shadow-frame-ring-strong data-focused:outline-none motion-reduce:transition-none"
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export interface AudioPlayerWaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  fallbackBarCount?: number
  keyboardStep?: number
}

export function AudioPlayerWaveform({
  className,
  fallbackBarCount = 64,
  keyboardStep = 5,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onKeyDown,
  ...props
}: AudioPlayerWaveformProps) {
  const player = useAudioPlayer()
  const time = useAudioPlayerTime()
  const containerRef = useRef<HTMLDivElement>(null)
  const wasPlayingRef = useRef(false)
  const [scrubbingValue, setScrubbingValue] = useState<number | null>(null)

  const peaks = player.activeItem?.peaks
  const { leftBars, rightBars } = useMemo(() => {
    if (peaks) {
      if (Array.isArray(peaks)) {
        return { leftBars: peaks, rightBars: peaks }
      }
      const len = Math.max(peaks.left.length, peaks.right.length)
      const pad = (arr: number[]) =>
        arr.length === len
          ? arr
          : arr.concat(Array.from({ length: len - arr.length }, () => 0))
      return { leftBars: pad(peaks.left), rightBars: pad(peaks.right) }
    }
    const flat = Array.from({ length: fallbackBarCount }, () => 0.2)
    return { leftBars: flat, rightBars: flat }
  }, [peaks, fallbackBarCount])

  const disabled =
    player.duration === undefined ||
    !Number.isFinite(player.duration) ||
    Number.isNaN(player.duration) ||
    player.duration === 0

  const displayTime = scrubbingValue ?? time
  const progress = disabled ? 0 : displayTime / (player.duration ?? 1)

  const seekFromPointer = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || disabled) return null
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return ratio * (player.duration ?? 0)
  }

  return (
    <div
      {...props}
      ref={containerRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={player.duration ?? 0}
      aria-valuenow={displayTime}
      aria-valuetext={`${formatTime(displayTime)} of ${formatTime(disabled ? 0 : (player.duration ?? 0))}`}
      aria-disabled={disabled}
      data-slot="audio-player-waveform"
      data-scrubbing={scrubbingValue !== null ? '' : undefined}
      className={cn(
        'group/waveform relative flex h-12 w-full touch-none items-stretch gap-px rounded-sm select-none focus-visible:shadow-frame-ring-strong focus-visible:outline-none',
        disabled && 'cursor-not-allowed opacity-50',
        !disabled && 'cursor-pointer',
        className
      )}
      onPointerDown={(e) => {
        if (!disabled) {
          e.currentTarget.setPointerCapture(e.pointerId)
          wasPlayingRef.current = player.isPlaying
          player.pause()
          const next = seekFromPointer(e.clientX)
          if (next !== null) setScrubbingValue(next)
        }
        onPointerDown?.(e)
      }}
      onPointerMove={(e) => {
        if (!disabled && scrubbingValue !== null) {
          const next = seekFromPointer(e.clientX)
          if (next !== null) setScrubbingValue(next)
        }
        onPointerMove?.(e)
      }}
      onPointerUp={(e) => {
        if (!disabled) {
          e.currentTarget.releasePointerCapture(e.pointerId)
          if (scrubbingValue !== null) {
            player.seek(scrubbingValue)
            setScrubbingValue(null)
          }
          if (wasPlayingRef.current) player.play()
        }
        onPointerUp?.(e)
      }}
      onKeyDown={(e) => {
        if (!disabled) {
          if (e.key === ' ') {
            e.preventDefault()
            if (player.isPlaying) player.pause()
            else player.play()
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            player.seek(Math.max(0, time - keyboardStep))
          } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            player.seek(Math.min(player.duration ?? 0, time + keyboardStep))
          } else if (e.key === 'Home') {
            e.preventDefault()
            player.seek(0)
          } else if (e.key === 'End') {
            e.preventDefault()
            player.seek(player.duration ?? 0)
          }
        }
        onKeyDown?.(e)
      }}
    >
      {leftBars.map((leftPeak, i) => {
        const rightPeak = rightBars[i] ?? 0
        const played = i / leftBars.length < progress
        const leftHeight = Math.max(4, Math.min(50, leftPeak * 50))
        const rightHeight = Math.max(4, Math.min(50, rightPeak * 50))
        const fill = played ? 'bg-primary' : 'bg-muted-foreground/30'
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data-played={played ? '' : undefined}
            className="pointer-events-none relative h-full flex-1"
          >
            <div
              className={cn(
                'absolute right-0 bottom-1/2 left-0 rounded-t-full',
                fill
              )}
              style={{ height: `${leftHeight}%` }}
            />
            <div
              className={cn(
                'absolute top-1/2 right-0 left-0 rounded-b-full',
                fill
              )}
              style={{ height: `${rightHeight}%` }}
            />
          </div>
        )
      })}
    </div>
  )
}

export const AudioPlayerTime = ({
  className,
  ...otherProps
}: HTMLProps<HTMLSpanElement>) => {
  const time = useAudioPlayerTime()
  return (
    <span
      {...otherProps}
      className={cn('text-sm text-muted-foreground tabular-nums', className)}
    >
      {formatTime(time)}
    </span>
  )
}

export const AudioPlayerDuration = ({
  className,
  ...otherProps
}: HTMLProps<HTMLSpanElement>) => {
  const player = useAudioPlayer()
  return (
    <span
      {...otherProps}
      className={cn('text-sm text-muted-foreground tabular-nums', className)}
    >
      {player.duration !== null &&
      player.duration !== undefined &&
      !Number.isNaN(player.duration)
        ? formatTime(player.duration)
        : '0:00'}
    </span>
  )
}

interface PlayButtonProps extends ComponentProps<typeof Button> {
  playing: boolean
  onPlayingChange: (playing: boolean) => void
  loading?: boolean
}

const PlayButton = ({
  playing,
  onPlayingChange,
  className,
  onClick,
  loading,
  ...otherProps
}: PlayButtonProps) => {
  return (
    <Button
      {...otherProps}
      onClick={(e) => {
        onPlayingChange(!playing)
        onClick?.(e)
      }}
      className={cn('relative', className)}
      aria-label={playing ? 'Pause' : 'Play'}
      type="button"
    >
      {playing ? (
        <IconPlayerPauseFilled
          data-slot="icon"
          className={cn(loading && 'opacity-0')}
          aria-hidden="true"
        />
      ) : (
        <IconPlayerPlayFilled
          data-slot="icon"
          className={cn(loading && 'opacity-0')}
          aria-hidden="true"
        />
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[inherit] backdrop-blur-xs">
          <Spinner />
        </div>
      )}
    </Button>
  )
}

export interface AudioPlayerButtonProps<TData = unknown> extends ComponentProps<
  typeof Button
> {
  item?: AudioPlayerItem<TData>
}

export function AudioPlayerButton<TData = unknown>({
  item,
  ...otherProps
}: AudioPlayerButtonProps<TData>) {
  const player = useAudioPlayer<TData>()

  if (!item) {
    return (
      <PlayButton
        {...otherProps}
        playing={player.isPlaying}
        onPlayingChange={(shouldPlay) => {
          if (shouldPlay) {
            player.play()
          } else {
            player.pause()
          }
        }}
        loading={player.isBuffering && player.isPlaying}
      />
    )
  }

  return (
    <PlayButton
      {...otherProps}
      playing={player.isItemActive(item.id) && player.isPlaying}
      onPlayingChange={(shouldPlay) => {
        if (shouldPlay) {
          player.play(item)
        } else {
          player.pause()
        }
      }}
      loading={
        player.isItemActive(item.id) && player.isBuffering && player.isPlaying
      }
    />
  )
}

function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      callbackRef.current()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const

export interface AudioPlayerSpeedProps extends ComponentProps<typeof Button> {
  speeds?: readonly number[]
}

export function AudioPlayerSpeed({
  speeds = PLAYBACK_SPEEDS,
  className,
  variant = 'ghost',
  size = 'icon',
  ...props
}: AudioPlayerSpeedProps) {
  const player = useAudioPlayer()
  const currentSpeed = player.playbackRate

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={variant}
            size={size}
            className={cn(className)}
            aria-label="Playback speed"
            {...props}
          >
            <IconSettings data-slot="icon" aria-hidden="true" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-30">
        <DropdownMenuRadioGroup
          value={currentSpeed}
          onValueChange={(speed: number) => player.setPlaybackRate(speed)}
        >
          {speeds.map((speed) => (
            <DropdownMenuRadioItem key={speed} value={speed} closeOnClick>
              <span className={speed === 1 ? '' : 'font-mono'}>
                {speed === 1 ? 'Normal' : `${speed}x`}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface AudioPlayerSpeedButtonGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  speeds?: readonly number[]
}

export function AudioPlayerSpeedButtonGroup({
  speeds = [0.5, 1, 1.5, 2],
  className,
  ...props
}: AudioPlayerSpeedButtonGroupProps) {
  const player = useAudioPlayer()
  const currentSpeed = player.playbackRate

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label="Playback speed controls"
      {...props}
    >
      {speeds.map((speed) => (
        <Button
          key={speed}
          variant={currentSpeed === speed ? 'primary' : 'outline'}
          aria-pressed={currentSpeed === speed}
          size="sm"
          onClick={() => player.setPlaybackRate(speed)}
          className="min-w-12.5 font-mono text-xs"
        >
          {speed}x
        </Button>
      ))}
    </div>
  )
}
