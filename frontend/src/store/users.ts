// src/store/users.ts
/* eslint‑disable @typescript-eslint/consistent‑type‑assertions */
import { ThunkAction } from "redux-thunk";
import type { RootState, AppDispatch } from "./index";

/* ────────────────────────────
   1. Types
   ──────────────────────────── */

export interface User {
  id: number | string;
  email: string;

  /* ── fields the UI uses ── */
  username: string;
  displayName?: string;
  profileImg?: string;
  createdAt?: string;
  postKarma?: number;
  commentKarma?: number;
  about?: string;

  /* ── snake_case aliases (optional) ── */
  display_name?: string;
  profile_img?: string;
  created_at?: string;
  post_karma?: number;
  comment_karma?: number;
}

export type UserSummary = Pick<
  User,
  | "id"
  | "username"
  | "displayName"
  | "profileImg"
  | "postKarma"
  | "commentKarma"
  | "createdAt"
>;

export type UsersState = Record<User["id"], User>;

export type UsersListResponse = { users?: User[]; Users?: User[] };

/* ────────────────────────────
   2. Helpers
   ──────────────────────────── */

/** Converts API snake_case to UI‑friendly camelCase once, up‑front */
const normalizeUser = (u: User): User => ({
  ...u,
  displayName: u.displayName ?? u.display_name,
  profileImg: u.profileImg ?? u.profile_img,
  createdAt: u.createdAt ?? u.created_at,
  postKarma: u.postKarma ?? u.post_karma,
  commentKarma: u.commentKarma ?? u.comment_karma,
});

/* ────────────────────────────
   3. Action constants & types
   ──────────────────────────── */

export const LOAD_USERS = "users/LOAD_USERS" as const;
export const LOAD_USER = "users/LOAD_USER" as const;

interface LoadUsersAction {
  type: typeof LOAD_USERS;
  users: UsersListResponse;
}

interface LoadUserAction {
  type: typeof LOAD_USER;
  user: User;
}

type UsersAction = LoadUsersAction | LoadUserAction;

/* ────────────────────────────
   4. Action creators
   ──────────────────────────── */

export const loadUsers = (users: UsersListResponse): LoadUsersAction => ({
  type: LOAD_USERS,
  users,
});

export const loadUser = (user: User): LoadUserAction => ({
  type: LOAD_USER,
  user,
});

/* ────────────────────────────
   5. Thunks
   ──────────────────────────── */

type ThunkResult<R> = ThunkAction<R, RootState, unknown, UsersAction>;

/** GET /api/users */
export const getUsers =
  (): ThunkResult<Promise<UsersListResponse | undefined>> =>
  async (dispatch: AppDispatch) => {
    const res = await fetch("/api/users");
    if (res.ok) {
      const list: UsersListResponse = await res.json();
      dispatch(loadUsers(list));
      return list;
    }
  };

/** GET /api/users/:id */
export const getUser =
  (id: User["id"]): ThunkResult<Promise<User | undefined>> =>
  async (dispatch: AppDispatch) => {
    const res = await fetch(`/api/users/${id}`);
    if (res.ok) {
      const raw: User = await res.json();
      const user = normalizeUser(raw);
      dispatch(loadUser(user));
      return user;
    }
  };

/** GET /api/users (current logged‑in user) */
export const getCurrentUser =
  (): ThunkResult<Promise<User | undefined>> =>
  async (dispatch: AppDispatch) => {
    const res = await fetch("/api/users");
    if (res.ok) {
      const raw: User = await res.json();
      const user = normalizeUser(raw);
      dispatch(loadUser(user));
      return user;
    }
  };

/** PUT /api/users/:id/profile/edit */
export const editProfile =
  (
    id: User["id"],
    payload: Pick<User, "display_name" | "about">
  ): ThunkResult<Promise<User | Record<string, string>>> =>
  async (dispatch: AppDispatch) => {
    const res = await fetch(`/api/users/${id}/profile/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as User | Record<string, string>;

    if (res.ok) {
      dispatch(loadUser(normalizeUser(data as User)));
    }

    // Success ⇒ User, error ⇒ { field: msg }
    return data;
  };

/* ────────────────────────────
   6. Reducer
   ──────────────────────────── */

const initialState: UsersState = {};

export default function usersReducer(
  state: UsersState = initialState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case LOAD_USERS: {
      const arr = action.users.users ?? action.users.Users ?? [];

      if (!Array.isArray(arr)) {
        console.error("Invalid users data structure:", action.users);
        return state;
      }

      return arr.reduce<UsersState>((acc, raw) => {
        const user = normalizeUser(raw as User);
        acc[user.id] = user;
        return acc;
      }, {});
    }

    case LOAD_USER: {
      const user = normalizeUser(action.user);
      return { ...state, [user.id]: user };
    }

    default:
      return state;
  }
}
