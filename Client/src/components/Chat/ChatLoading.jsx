import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
      <Skeleton height="60px" borderRadius={10}/>
    </Stack>
  );
};

export default ChatLoading;