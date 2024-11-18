// @generated
// Automatically generated. Don't change this file manually.

import ActionAttempt, {
  ActionAttemptInitializer,
  ActionAttemptId,
} from "./ActionAttempt"
import APIKey, { APIKeyInitializer, APIKeyId } from "./APIKey"
import ConnectWebview, {
  ConnectWebviewInitializer,
  ConnectWebviewId,
} from "./ConnectWebview"
import Device, { DeviceInitializer, DeviceId } from "./Device"
import DeviceEvent, {
  DeviceEventInitializer,
  DeviceEventId,
} from "./DeviceEvent"
import DeviceGroup, {
  DeviceGroupInitializer,
  DeviceGroupId,
} from "./DeviceGroup"
import DeviceGroupDevice, {
  DeviceGroupDeviceInitializer,
  DeviceGroupDeviceId,
} from "./DeviceGroupDevice"
import ThirdPartyAccount, {
  ThirdPartyAccountInitializer,
  ThirdPartyAccountId,
} from "./ThirdPartyAccount"
import ThirdPartyDevice, {
  ThirdPartyDeviceInitializer,
  ThirdPartyDeviceId,
} from "./ThirdPartyDevice"
import User, { UserInitializer, UserId } from "./User"
import UserSession, {
  UserSessionInitializer,
  UserSessionId,
} from "./UserSession"
import UserWorkspace, {
  UserWorkspaceInitializer,
  UserWorkspaceId,
} from "./UserWorkspace"
import Webhook, { WebhookInitializer, WebhookId } from "./Webhook"
import WebhookResponse, {
  WebhookResponseInitializer,
  WebhookResponseId,
} from "./WebhookResponse"
import Workspace, { WorkspaceInitializer, WorkspaceId } from "./Workspace"

type Model =
  | ActionAttempt
  | APIKey
  | ConnectWebview
  | Device
  | DeviceEvent
  | DeviceGroup
  | DeviceGroupDevice
  | ThirdPartyAccount
  | ThirdPartyDevice
  | User
  | UserSession
  | UserWorkspace
  | Webhook
  | WebhookResponse
  | Workspace

interface ModelTypeMap {
  action_attempt: ActionAttempt
  api_key: APIKey
  connect_webview: ConnectWebview
  device: Device
  device_event: DeviceEvent
  device_group: DeviceGroup
  device_group_device: DeviceGroupDevice
  third_party_account: ThirdPartyAccount
  third_party_device: ThirdPartyDevice
  user: User
  user_session: UserSession
  user_workspace: UserWorkspace
  webhook: Webhook
  webhook_response: WebhookResponse
  workspace: Workspace
}

type ModelId =
  | ActionAttemptId
  | APIKeyId
  | ConnectWebviewId
  | DeviceId
  | DeviceEventId
  | DeviceGroupId
  | DeviceGroupDeviceId
  | ThirdPartyAccountId
  | ThirdPartyDeviceId
  | UserId
  | UserSessionId
  | UserWorkspaceId
  | WebhookId
  | WebhookResponseId
  | WorkspaceId

interface ModelIdTypeMap {
  action_attempt: ActionAttemptId
  api_key: APIKeyId
  connect_webview: ConnectWebviewId
  device: DeviceId
  device_event: DeviceEventId
  device_group: DeviceGroupId
  device_group_device: DeviceGroupDeviceId
  third_party_account: ThirdPartyAccountId
  third_party_device: ThirdPartyDeviceId
  user: UserId
  user_session: UserSessionId
  user_workspace: UserWorkspaceId
  webhook: WebhookId
  webhook_response: WebhookResponseId
  workspace: WorkspaceId
}

type Initializer =
  | ActionAttemptInitializer
  | APIKeyInitializer
  | ConnectWebviewInitializer
  | DeviceInitializer
  | DeviceEventInitializer
  | DeviceGroupInitializer
  | DeviceGroupDeviceInitializer
  | ThirdPartyAccountInitializer
  | ThirdPartyDeviceInitializer
  | UserInitializer
  | UserSessionInitializer
  | UserWorkspaceInitializer
  | WebhookInitializer
  | WebhookResponseInitializer
  | WorkspaceInitializer

interface InitializerTypeMap {
  action_attempt: ActionAttemptInitializer
  api_key: APIKeyInitializer
  connect_webview: ConnectWebviewInitializer
  device: DeviceInitializer
  device_event: DeviceEventInitializer
  device_group: DeviceGroupInitializer
  device_group_device: DeviceGroupDeviceInitializer
  third_party_account: ThirdPartyAccountInitializer
  third_party_device: ThirdPartyDeviceInitializer
  user: UserInitializer
  user_session: UserSessionInitializer
  user_workspace: UserWorkspaceInitializer
  webhook: WebhookInitializer
  webhook_response: WebhookResponseInitializer
  workspace: WorkspaceInitializer
}

export type {
  ActionAttempt,
  ActionAttemptInitializer,
  ActionAttemptId,
  APIKey,
  APIKeyInitializer,
  APIKeyId,
  ConnectWebview,
  ConnectWebviewInitializer,
  ConnectWebviewId,
  Device,
  DeviceInitializer,
  DeviceId,
  DeviceEvent,
  DeviceEventInitializer,
  DeviceEventId,
  DeviceGroup,
  DeviceGroupInitializer,
  DeviceGroupId,
  DeviceGroupDevice,
  DeviceGroupDeviceInitializer,
  DeviceGroupDeviceId,
  ThirdPartyAccount,
  ThirdPartyAccountInitializer,
  ThirdPartyAccountId,
  ThirdPartyDevice,
  ThirdPartyDeviceInitializer,
  ThirdPartyDeviceId,
  User,
  UserInitializer,
  UserId,
  UserSession,
  UserSessionInitializer,
  UserSessionId,
  UserWorkspace,
  UserWorkspaceInitializer,
  UserWorkspaceId,
  Webhook,
  WebhookInitializer,
  WebhookId,
  WebhookResponse,
  WebhookResponseInitializer,
  WebhookResponseId,
  Workspace,
  WorkspaceInitializer,
  WorkspaceId,
  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap,
}
