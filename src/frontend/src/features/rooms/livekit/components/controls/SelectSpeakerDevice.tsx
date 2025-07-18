import { useTranslation } from 'react-i18next'
import { useMediaDeviceSelect } from '@livekit/components-react'
import { Button, Menu, MenuList } from '@/primitives'
import { RiArrowDownSLine, RiVolumeUpLine } from '@remixicon/react'
import { css } from '@/styled-system/css'
import { useEffect } from 'react'
import { SoundTester } from '@/components/SoundTester'
import { usePersistentUserChoices } from '../../livekit/hooks/usePersistentUserChoices'

export type SelectSpeakerDeviceProps = {
  initialDeviceId?: string
  onActiveDeviceChange: (deviceId: string) => void
  menuVariant?: 'dark' | 'light'
  hideMenu?: boolean
}

export const SelectSpeakerDevice = ({
  initialDeviceId,
  onActiveDeviceChange,
  menuVariant = 'light',
  hideMenu,
}: SelectSpeakerDeviceProps) => {
  const { t } = useTranslation('settings')
  const {
    userChoices: { audioOutputDeviceId },
    saveAudioOutputDeviceId,
  } = usePersistentUserChoices()
  const {
    devices,
    activeDeviceId,
    setActiveMediaDevice,
  } = useMediaDeviceSelect({ kind: 'audiooutput' })

  useEffect(() => {
    if (audioOutputDeviceId !== undefined) {
      setActiveMediaDevice(audioOutputDeviceId)
    } else if (initialDeviceId !== undefined) {
      setActiveMediaDevice(initialDeviceId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveMediaDevice])

  const selectLabel = t('audio.speakers.label')

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      })}
    >
      <Menu variant={menuVariant}>
        <Button
          tooltip={selectLabel}
          aria-label={selectLabel}
          groupPosition="left"
          square
          variant={menuVariant === 'dark' ? 'primaryTextDark' : 'primaryDark'}
        >
          <RiVolumeUpLine />
          <RiArrowDownSLine />
        </Button>
        <MenuList
          items={devices.map((d) => ({
            value: d.deviceId,
            label: d.label,
          }))}
          selectedItem={activeDeviceId}
          onAction={(value) => {
            setActiveMediaDevice(value as string)
            onActiveDeviceChange(value as string)
            saveAudioOutputDeviceId(value as string)
          }}
          variant={menuVariant}
        />
      </Menu>
      <SoundTester />
    </div>
  )
} 