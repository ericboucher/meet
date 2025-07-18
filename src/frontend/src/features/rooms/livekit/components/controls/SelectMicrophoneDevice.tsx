import { SelectToggleDevice } from './SelectToggleDevice'
import { Track } from 'livekit-client'
import { SelectToggleDeviceProps } from './SelectToggleDevice'

export const SelectMicrophoneDevice = (props: Omit<SelectToggleDeviceProps<typeof Track.Source.Microphone>, 'source'>) => (
  <SelectToggleDevice source={Track.Source.Microphone} {...props} />
) 