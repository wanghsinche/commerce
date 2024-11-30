import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
      aria-label={`${process.env.SITE_NAME} logo`}
      {...props}
      className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
    >
      <path d="M8 4v16h4v-12h8l-2 4h6l4-8z" fill="black" />

      <path d="M12 12v16h12l-2-4h-6v-8h4l-2-4z" fill="black" />
    </svg>
  )
  // return (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     aria-label={`${process.env.SITE_NAME} logo`}
  //     viewBox="0 0 32 28"
  //     {...props}
  //     className={clsx('h-4 w-4 fill-black dark:fill-white', props.className)}
  //   >
  //     <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
  //     <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
  //   </svg>
  // );
}
