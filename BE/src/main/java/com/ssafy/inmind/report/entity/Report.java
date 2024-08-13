package com.ssafy.inmind.report.entity;

import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "report")
public class Report extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_idx", nullable = false)
    private Child child;

    @Column(name = "object_result", nullable = false)
    private String objectResult;

    @Column(name = "result", nullable = false)
    private String result;

    @Column(name = "img_h")
    private String houseImage;

    @Column(name = "img_t")
    private String treeImage;

    @Column(name = "img_p")
    private String personImage;

    @Column(name = "background", nullable = false)
    private String background;

    @Column(name = "drawing_flow", nullable = false)
    private String drawingFlow;

}