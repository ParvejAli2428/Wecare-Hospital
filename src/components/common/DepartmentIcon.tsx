import React from 'react';
import {
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Activity,
  Users,
  Sparkles,
  Stethoscope,
  LucideProps
} from 'lucide-react';

interface DepartmentIconProps extends LucideProps {
  name: string;
}

export const DepartmentIcon: React.FC<DepartmentIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'HeartPulse':
      return <HeartPulse {...props} />;
    case 'Brain':
      return <Brain {...props} />;
    case 'Baby':
      return <Baby {...props} />;
    case 'Bone':
      return <Bone {...props} />;
    case 'Activity':
      return <Activity {...props} />;
    case 'Users':
      return <Users {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    default:
      return <Stethoscope {...props} />;
  }
};
