import React from 'react';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from '@heroui/popover';
import { useDisclosure } from '@heroui/use-disclosure';
import { HiChevronDown } from 'react-icons/hi2';

export type PopoverFilterProps = Omit<PopoverProps, 'children'> & {
  title?: string;
  children: React.ReactNode;
  onApply?: () => void;
  onClear?: () => void;
  showActions?: boolean;
};

const PopoverFilter = React.forwardRef<HTMLDivElement, PopoverFilterProps>(
  ({ title, children, onApply, onClear, showActions = true, ...props }, ref) => {
    const { isOpen, onClose, onOpenChange } = useDisclosure();

    const handleApply = () => {
      onApply?.();
      onClose();
    };

    const handleClear = () => {
      onClear?.();
    };

    return (
      <Popover ref={ref} isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
        <PopoverTrigger>
          <Button
            className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm hover:bg-white/10"
            endContent={<HiChevronDown className="w-4 h-4" />}
            variant="bordered"
          >
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex max-w-xs flex-col items-start gap-2 px-4 pt-4 bg-gray-900 border-white/10">
          <span className="mb-2 text-medium font-medium text-white">{title}</span>
          <div className="w-full px-2">{children}</div>
          {showActions && (
            <>
              <Divider className="mt-3 bg-white/10" />
              <div className="flex w-full justify-end gap-2 py-2">
                <Button size="sm" variant="flat" onPress={handleClear}>
                  Clear
                </Button>
                <Button color="primary" size="sm" variant="flat" onPress={handleApply}>
                  Apply
                </Button>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

PopoverFilter.displayName = 'PopoverFilter';

export default PopoverFilter;