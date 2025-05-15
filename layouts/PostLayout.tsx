import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images, canonicalUrl } = content
  const basePath = path.split('/')[0]

  const audioSrc =
    typeof images === 'string' ? images : Array.isArray(images) ? images[0] : undefined

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-4">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl>
                <div className="text-left">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
                <div className="text-left">
                  <dt className="sr-only">Author</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    Author: {authorDetails.map((author) => author.name).join(', ')}
                  </dd>
                  {canonicalUrl && (
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Original: <a href="https://www.paulgraham.com/do.html">{canonicalUrl}</a>
                    </dd>
                  )}
                </div>
              </dl>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                {/* Optional native audio player */}
                {audioSrc && (
                  <div className="not-prose justify-left flex pt-4">
                    <audio
                      controls
                      preload="metadata"
                      className="w-full max-w-md rounded-lg shadow-sm"
                      src={audioSrc}
                    >
                      <track kind="captions" src="" label="English captions" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {children}
              </div>
            </div>

            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {/* footer content unchanged */}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
