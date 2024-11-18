// @generated
// Automatically generated. Don't change this file manually.

import { CapabilitySupport } from "types/capability-states"
import InjectedCapabilityStates from "../injected-types/InjectedCapabilityStates"
import InjectedDeviceProperties from "../injected-types/InjectedDeviceProperties"
import { WorkspaceId } from "./Workspace"
import { ThirdPartyDeviceId } from "./ThirdPartyDevice"

export type DeviceId = string & { " __flavor"?: "device" }

export default interface Device {
  /**
   * smartthings_device_id
   * Primary key. Index: device_pkey
   * Primary key. Index: device_pkey
   */
  device_id: DeviceId

  device_num: number

  device_type: string | null

  /** Index: smartthings_st_device_ext_smartthings_device_id_workspace_unq */
  workspace_id: WorkspaceId

  properties: InjectedDeviceProperties

  capability_states: InjectedCapabilityStates

  created_at: Date

  /** Index: device_third_party_device_id_key */
  third_party_device_id: ThirdPartyDeviceId | null

  location: unknown | null

  capability_support: CapabilitySupport
}

export interface DeviceInitializer {
  /**
   * smartthings_device_id
   * Default value: gen_random_uuid()
   * Primary key. Index: device_pkey
   * Primary key. Index: device_pkey
   */
  device_id?: DeviceId

  /** Default value: nextval('seam.device_device_num_seq'::regclass) */
  device_num?: number

  device_type?: string | null

  /** Index: smartthings_st_device_ext_smartthings_device_id_workspace_unq */
  workspace_id: WorkspaceId

  /** Default value: '{}'::jsonb */
  properties?: InjectedDeviceProperties

  /** Default value: '{}'::jsonb */
  capability_states?: InjectedCapabilityStates

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date

  /** Index: device_third_party_device_id_key */
  third_party_device_id?: ThirdPartyDeviceId | null

  location?: unknown | null
}
