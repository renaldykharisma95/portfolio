import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 } as any);
  const isTablet = useMediaQuery({ min: 768, max: 1023 } as any);
  const isDesktop = useMediaQuery({ min: 1024, max: 1439 } as any);
  const isBigScreen = useMediaQuery({ min: 1440 } as any);

  return { isMobile, isTablet, isDesktop, isBigScreen };
};

export default useResponsive;
