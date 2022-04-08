type Props = {
  onClick: () => void;
  darkMode: boolean;
  size?: number;
  transitionSpeed?: number;
  className?: string;
}

const DarkModeToggle = ({onClick, darkMode, className, size = 1, transitionSpeed = 0.2}: Props) => {
  const paths = {
    moon: 'M 12 16 C 10 15 10 12 10 12 C 10 12 10 9 12 8 C 9.7909 8 8 9.7909 8 12 C 8 14.2091 9.7909 16 12 16 Z M 12 18 C 15.3137 18 18 15.3137 18 12 C 18 8.6863 15.3137 6 12 6 C 8.6863 6 6 8.6863 6 12 C 6 15.3137 8.6863 18 12 18 Z',
    sun: 'M 12 16 C 14.2091 16 16 14.2091 16 12 C 16 9.7909 14.2091 8 12 8 C 9.7909 8 8 9.7909 8 12 C 8 14.2091 9.7909 16 12 16 Z M 12 18 C 15.3137 18 18 15.3137 18 12 C 18 8.6863 15.3137 6 12 6 C 8.6863 6 6 8.6863 6 12 C 6 15.3137 8.6863 18 12 18 Z',
  };

  return (
    <div
      onClick={onClick}
      className={"cursor-pointer " + className}>
      <svg viewBox="0 0 24 24" stroke="black" strokeWidth="0.4" width={size + 'em'} height={size + 'em'} strokeLinecap="round" fill="transparent">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={paths[darkMode ? 'sun' : 'moon']}
          fill="currentColor"
          style={{
            transition: `all ${transitionSpeed}s ease-in-out`,
          }}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z"
          fill="currentColor"
          style={{
            transformOrigin: 'center',
            transform: darkMode ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(15deg)',
            opacity: darkMode ? '1' : '0' ,
            transition: `all ${transitionSpeed}s ease-in-out`,
          }} />
      </svg>
    </div>
  )
}

export default DarkModeToggle;