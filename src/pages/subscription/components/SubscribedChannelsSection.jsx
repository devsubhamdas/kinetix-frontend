import { Link } from "react-router-dom";

const MAX_CHARS = 10;

const truncateName = (name = "") =>
  name.length > MAX_CHARS ? `${name.slice(0, MAX_CHARS)}...` : name;

export default function SubscribedChannels({ subscribedChannels = [] }) {
  if (!subscribedChannels.length) return null;

  return (
    <section
      aria-label="Subscribed channels"
      className="w-full text-neutral-900 dark:text-neutral-100"
    >
      <ul className="no-scrollbar flex gap-3 overflow-x-auto px-3 py-2 sm:gap-4 sm:px-4 md:gap-5 lg:gap-6">
        {subscribedChannels.map(({ _id, channel }) => (
          <li key={_id} className="shrink-0">
            <Link
              to={`/channel/${channel.username}`}
              title={channel.username}
              className="group flex w-16 flex-col items-center gap-1.5 sm:w-20 md:w-24 lg:w-28"
            >
              {channel.avatar ? (
                <img
                  src={channel.avatar}
                  alt={channel.username}
                  loading="lazy"
                  className="size-14 rounded-full object-cover bg-gray-100 dark:bg-neutral-800
                         ring-2 ring-transparent transition
                         group-hover:ring-gray-300 group-focus-visible:ring-gray-400
                         dark:group-hover:ring-neutral-600 dark:group-focus-visible:ring-neutral-500
                         sm:size-16 md:size-20 lg:size-24"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-full text-lg font-semibold uppercase
                         bg-gray-200 text-gray-600
                         dark:bg-neutral-700 dark:text-neutral-300
                         sm:size-16 md:size-20 md:text-xl lg:size-24 lg:text-2xl"
                >
                  {channel.username?.[0]}
                </span>
              )}

              <span className="w-full whitespace-nowrap text-center text-xs text-gray-700 dark:text-neutral-300 sm:text-sm lg:text-base">
                {truncateName(channel.username)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/*
Usage:

  <SubscribedChannels subscribedChannels={response.data.subscribedChannels} />

Expected item shape (channel must be populated, see note below):

  {
    _id: "678418e2b75168e57c1ce0c4",
    channel: { _id: "6769bc9c...", username: "techwithsam", avatar: "https://..." }
  }
*/
