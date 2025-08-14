import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToggleSwitch, DropBox } from "@/components";
import { CommunityNameOption } from "./CommunityNameOption";
import { useAppDispatch } from "@/store";
import {
  updateSettingsNameIcon,
  getCommunitySettings,
  getCommunities,
} from "@/store";

const DEFAULT_ICON_URL = "https://i.imgur.com/9CI9hiO.png";

export async function uploadCommunityIcon(communityId, file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`/api/communities/${communityId}/img`, {
    method: "POST",
    body: formData,
    credentials: "same-origin", // send cookies if needed
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok || !data?.url) {
    const msg = data?.errors || data?.error || `Upload failed (${res.status})`;
    throw new Error(msg);
  }
  return data.url; // absolute S3 URL
}

export function PreviewCommunityNameIcon({ setOpenAppearance, settingsState }) {
  const {
    community, // { id, ... }
    nameFormat, // "c/" | "" | "Hide"
    setNameFormat,
    communityIcon, // current icon URL from store
    setCommunityIcon,
    hideCommunityIcon,
    setHideCommunityIcon,
    communitySettings, // { id, communityIcon, ... }
  } = settingsState;

  const dispatch = useAppDispatch();

  const [iconFile, setIconFile] = useState(null);
  const [preview, setPreview] = useState(communityIcon || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const options = ["c/", "", "Hide"];

  const handleErase = async () => {
    if (!communitySettings?.id || !community?.id) return;
    await dispatch(
      updateSettingsNameIcon({
        settingsId: communitySettings.id,
        nameFormat,
        hideCommunityIcon,
        communityIcon: DEFAULT_ICON_URL,
      })
    );
    await Promise.all([
      dispatch(getCommunities()),
      dispatch(getCommunitySettings(community.id)),
    ]);
    setCommunityIcon(DEFAULT_ICON_URL);
    setPreview(DEFAULT_ICON_URL);
  };

  const handleSubmit = async () => {
    if (!communitySettings?.id || !community?.id) return;

    setError(null);
    setSaving(true);

    try {
      let iconToSend = communitySettings.communityIcon || DEFAULT_ICON_URL;

      if (iconFile) {
        // 1) Upload to S3 -> get persistent URL
        const s3Url = await uploadCommunityIcon(community.id, iconFile);
        iconToSend = s3Url;
        setPreview(s3Url); // swap preview from blob: to S3 URL
        setCommunityIcon(s3Url); // keep local state in sync
      } else if (preview === "") {
        // user cleared → reset to default
        iconToSend = DEFAULT_ICON_URL;
      } else if (preview && preview !== communitySettings.communityIcon) {
        // user pasted/changed a URL manually
        iconToSend = preview;
      }

      // 2) Persist name/icon flags in settings
      await dispatch(
        updateSettingsNameIcon({
          settingsId: communitySettings.id, // settings PUT
          nameFormat,
          hideCommunityIcon,
          communityIcon: iconToSend, // <- S3 URL here
        })
      );

      // 3) One refetch so UI sees the final values
      await Promise.all([
        dispatch(getCommunitySettings(community.id)),
        dispatch(getCommunities()),
      ]);

      setOpenAppearance(false);
    } catch (e) {
      setError(e.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="preview-community-name-icon">
      <h1>Name & icon</h1>

      <div className="preview-community-theme-colors-box">
        <h2>Community Name Format</h2>
        <div className="preview-community-name-icon-box">
          {options.map((option) => (
            <CommunityNameOption
              key={uuidv4()}
              community={community}
              title={option}
              activeRadio={nameFormat}
              setActiveRadio={setNameFormat}
            />
          ))}
        </div>
      </div>

      <div className="preview-community-theme-colors-box">
        <h2>Community Icon</h2>
        <div className="preview-community-name-icon-box">
          <h3>Custom Image</h3>
          <DropBox
            setImage={setIconFile}
            preview={preview}
            setPreview={setPreview}
            // optional: pass default & handleErase so trash resets to default
            defaultIcon={DEFAULT_ICON_URL}
            handleErase={handleErase}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>

      <div className="preview-community-theme-colors-box">
        <h2 style={{ color: "var(--main-text-color)" }}>Community Icon</h2>
        <label className="preview-community-toggle-switch" name="switch">
          <ToggleSwitch
            checked={hideCommunityIcon}
            setChecked={setHideCommunityIcon}
            community={community}
          />
          <div className="preview-community-toggle-switch-txt">
            <h3>Hide Community Icon in Banner</h3>
            <p>Your Community Icon will still display in other areas</p>
          </div>
        </label>
      </div>

      {error && (
        <div className="update-post-errors" role="alert">
          {error}
        </div>
      )}

      <div className="preview-community-theme-btns">
        <button
          className="blue-btn-filled btn-long"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          className="blue-btn-unfilled btn-long"
          onClick={() => setOpenAppearance(false)}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
