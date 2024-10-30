import { useRouter } from 'next/router';

import Meta from '@/components/common/Meta';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="mt-24 text-center">
      <Meta title="404" />

      <div className="flex justify-center py-12">
        <img
          src="/logo.png"
          className="h-16"
          alt="logo"
          onClick={() => router.push('/')}
        />
      </div>

      <p className="text-lg font-semibold">404 - Page Not Found</p>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Button
        className="mt-4 bg-primary-azureBlue text-white"
        onClick={() => router.push('/')}
      >
        Go to HomePage
      </Button>
    </div>
  );
};

export default NotFound;
