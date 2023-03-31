import React, { useState, useEffect, HTMLAttributes } from 'react'
import cx from 'classnames'

export type LinkPreviewData = Partial<{
  title: string
  type: string
  website: string
  description: string
  images: Partial<{
    URL: string
    SURL: string
    Type: string
    Width: number
    Height: number
    Alt: string
  }>[]
}>

export type ReactLinkPreviewProps = {
  href: string
} & Partial<{ host: string; fetchOptions: RequestInit }>

export type ReactLinkPreviewComponentProps = ReactLinkPreviewProps &
  HTMLAttributes<HTMLAnchorElement> & {
    external?: boolean
  }

export const useLinkPreview = ({
  href,
  host = 'https://og-service.herokuapp.com/',

  fetchOptions = {}
}: ReactLinkPreviewProps) => {
  const [data, setData] = useState<LinkPreviewData>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetch(`${host}?link=${href}`, fetchOptions)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(e => setError(e))
  }, [])

  return { data, error }
}

export const LinkPreview = ({
  children,
  href,
  host,
  fetchOptions,
  external,
  ...props
}: ReactLinkPreviewComponentProps) => {
  const { data, error } = useLinkPreview({
    href,
    host,
    fetchOptions
  })

  const [visible, setVisible] = useState(false)

  return (
    <div
      onMouseLeave={() => setVisible(false)}
      onMouseOver={() => setVisible(true)}
      className={cx('link-preview', props.className)}>
      <a {...props} href={href} rel={external ? 'noopener noreferrer' : ''} target={external ? '_blank' : '_self'}>
        {children}
      </a>
      {data && (
        <div
          onTouchStart={() => setVisible(true)}
          onTouchCancel={() => setVisible(false)}
          onMouseOver={() => setVisible(true)}
          className={visible ? 'visible' : 'hidden'}
          aria-hidden={true}>
          <a {...props} href={href}>
            <h2>{data.title}</h2>
          </a>
          <p>{data.description}</p>
          {data.images?.map(img => (
            <img src={img.URL} height={img.Height} width={img.Width} alt={img.Alt} />
          ))}
        </div>
      )}

      {error && <div role="alert">{error.message}</div>}
    </div>
  )
}
