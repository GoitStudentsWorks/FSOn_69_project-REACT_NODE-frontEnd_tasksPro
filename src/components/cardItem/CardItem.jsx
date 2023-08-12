import React from 'react';
import { useModal } from 'hooks';

import { Modal, CardPopUp } from 'components';
import SvgIcon from 'components/svgIcon/SvgIcon';

import {
  CardContainer,
  Circle,
  Description,
  DetailLabel,
  Details,
  DetailsContainer,
  DetailValue,
  IconsContainer,
  PriorityBlock,
  Title,
} from './CardItem.styled';

const CardItem = ({ item }) => {
  const { isModal, onBackdropClick, toggleModal } = useModal();
  const { title, description, priority, deadline } = item;
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const isDeadlineToday =
    deadlineDate.toDateString() === currentDate.toDateString();
  const formattedDeadline = `${
    deadlineDate.getMonth() + 1
  }/${deadlineDate.getDate()}/${deadlineDate.getFullYear()}`;
  return (
    <CardContainer priority={priority}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Details>
        <DetailsContainer>
          <div>
            <DetailLabel>Priority:</DetailLabel>
            <PriorityBlock>
              <Circle priority={priority} />
              <DetailValue>{priority}</DetailValue>
            </PriorityBlock>
          </div>
          <div>
            <DetailLabel>Deadline:</DetailLabel>
            <DetailValue>{formattedDeadline}</DetailValue>
          </div>
        </DetailsContainer>

        <IconsContainer>
          {isDeadlineToday && (
            <SvgIcon svgName="icon-bell" size={16} stroke="#BEDBB0" />
          )}
          <div onClick={toggleModal}>
            <SvgIcon svgName="icon-pencil" size={16} stroke="#FFFFFF80" />
          </div>

          <SvgIcon svgName="icon-trash" size={16} stroke="#FFFFFF80" />
        </IconsContainer>
      </Details>
      {isModal && (
        <Modal onBackdropClick={onBackdropClick}>
          <CardPopUp
            card={item}
            // columnId={columnId}
            // cardIndex={cardIndex}
            handleModalClose={toggleModal}
          />
        </Modal>
      )}
    </CardContainer>
  );
};

export default CardItem;
